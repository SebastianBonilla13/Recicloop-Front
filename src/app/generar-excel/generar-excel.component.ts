/* import { Component } from '@angular/core';

@Component({
  selector: 'app-generar-excel',
  imports: [],
  templateUrl: './generar-excel.component.html',
  styleUrl: './generar-excel.component.css'
})
export class GenerarExcelComponent {

}
 */
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

import { HttpClient, HttpClientModule } from '@angular/common/http';

// generar-excel.component.ts
import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { mockData } from '../data/mock-convocatorias'; // Asegúrate de que la ruta sea correcta
import { ApiResponse } from '../data/importsConvocatoria';
import { ConvocatoriaListarConFiltroProyeccion } from '../noticias/listar-convocatorias/listar-convocatorias.component';


@Component({
  imports: [HttpClientModule],
  selector: 'app-generar-excel',
  template: `<button (click)="exportarConExcelJS()">Exportar Excel</button>`,
})
export class GenerarExcelComponent {

  constructor(private http: HttpClient) { }

  respuesta: ApiResponse<ConvocatoriaListarConFiltroProyeccion> = mockData; // Datos de ejemplo

  exportarExcel(): void {

    /* const datosFormateados = this.respuesta.data.content.map((item, index) => ({
      '#': index + 1,
      ...item
    })); */

    // datos sin formatear
    const datosFormateados: ConvocatoriaListarConFiltroProyeccion[] = this.respuesta.data.content;

    // Formatear los datos para el archivo Excel
    const hoja = XLSX.utils.json_to_sheet(datosFormateados);
    const libro = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(libro, hoja, 'hoja Convocatorias');

    XLSX.writeFile(libro, 'convocatorias.xlsx');
  }


  exportarExcell(): void {

    // Leer la plantilla Excel
    fetch('./plantillaConvocatoria-v2.xlsx')
      .then(response => response.arrayBuffer())
      .then(buffer => {
        // Cargar la plantilla
        const workbook = XLSX.read(buffer, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[2]];

        // Formatear los datos
        const datosFormateados: ConvocatoriaListarConFiltroProyeccion[] = this.respuesta.data.content;

        // Convertir los datos a un formato de array para Excel
        const datosArray = [
          ['ID', 'Nombre', 'Estado', 'Tipo Financiación'], // Encabezados
          ...datosFormateados.map(item => [
            item.id,
            item.nombre,
            item.estado,
            item.tipoFinanciacion
          ])
        ];

        // Escribir los datos desde la celda B8
        XLSX.utils.sheet_add_aoa(worksheet, datosArray, { origin: 'A8' });

        // Guardar el archivo
        XLSX.writeFile(workbook, 'convocatorias_con_plantilla.xlsx');
      });
  }

  exportarConPlantilla(): void {
    const datos = this.respuesta.data.content;

    // Cargar la plantilla desde assets usando HttpClient
    this.http.get('/plantillaConvocatoria-v2.xlsx', { responseType: 'arraybuffer' })
      .subscribe({
        next: (buffer) => {
          try {
            // Leer el archivo Excel
            const workbook = XLSX.read(buffer, { type: 'array' });
            console.log('Workbook cargado:', workbook);

            // Validar que el archivo tenga al menos una hoja
            if (!workbook.SheetNames || workbook.SheetNames.length === 0) {
              throw new Error('La plantilla no contiene hojas válidas.');
            }
            console.log('Hojas disponibles:', workbook.SheetNames);

            // Obtener la primera hoja
            const hoja = workbook.Sheets[workbook.SheetNames[0]];
            if (!hoja) {
              throw new Error('No se pudo encontrar la hoja especificada en la plantilla.');
            }
            console.log('Hoja cargada:', hoja);

            // Formatear los datos
            const datosArray = [
              ['ID', 'Nombre', 'Estado', 'Tipo Financiación'], // Encabezados
              ...datos.map(item => [
                item.id,
                item.nombre,
                item.estado,
                item.tipoFinanciacion
              ])
            ];
            console.log('Datos formateados:', datosArray);

            // Escribir los datos desde la celda A8
            /* XLSX.utils.sheet_add_aoa(hoja, datosArray, { origin: 'A8' }); */

            // Ajustar el rango de la hoja
            /* const nuevoRango = XLSX.utils.decode_range(hoja['!ref'] ?? 'A1');
            nuevoRango.s.r = Math.min(nuevoRango.s.r, 7);
            nuevoRango.s.c = Math.min(nuevoRango.s.c, 1);
            hoja['!ref'] = XLSX.utils.encode_range(nuevoRango); */

            // Guardar el archivo
            XLSX.writeFile(workbook, 'convocatorias_generadas.xlsx');
          } catch (error) {
            console.error('Error al procesar la plantilla:');
          }
        },
        error: () => {
          console.error('Error al cargar la plantilla:');
        }
      });
  }

  
async exportarConExcelJS() {
  try {
    // Load the Excel file
    const workbook = new ExcelJS.Workbook();
    const response = await fetch('./plantillaConvocatoria-v3.xlsx');
    /* const response = await fetch('./ejm.xlsx'); */
    const buffer = await response.arrayBuffer();
    await workbook.xlsx.load(buffer);

    // Get the worksheet
    const hojaDatos = workbook.getWorksheet('Reporte');
    if (!hojaDatos) {
      throw new Error("La hoja 'DatosConvocatorias' no existe en el archivo Excel.");
    }

    // Format the data to write
    const datosFormateados: ConvocatoriaListarConFiltroProyeccion[] = this.respuesta.data.content;

    // Write headers
    hojaDatos.getCell('A8').value = 'ID';
    hojaDatos.getCell('B8').value = 'Nombre';
    hojaDatos.getCell('C8').value = 'Estado';
    hojaDatos.getCell('D8').value = 'Tipo Financiación';

    // Insert data starting from row 9
    let rowIndex = 9;
    datosFormateados.forEach(item => {
      hojaDatos.getCell(`A${rowIndex}`).value = item.id;
      hojaDatos.getCell(`B${rowIndex}`).value = item.nombre;
      hojaDatos.getCell(`C${rowIndex}`).value = item.estado;
      hojaDatos.getCell(`D${rowIndex}`).value = item.tipoFinanciacion;
      rowIndex++;
    });

    // Save the file
    const outputBuffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([outputBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, 'convocatorias_con_datos.xlsx');
    console.log('Archivo Excel generado y guardado correctamente.');
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error al exportar el archivo Excel:', error.message);
    } else {
      console.error('Error desconocido al exportar el archivo Excel:', error);
    }
  }
}


  /* exportarConPlantilla(): void {
    const datos = this.respuesta.data.content;
  
    fetch('assets/plantillaConvocatoria-v.xlsx')
      .then(res => {
        if (!res.ok) {
          throw new Error(`Error al cargar la plantilla: ${res.statusText}`);
        }
        return res.arrayBuffer();
      })
      .then(buffer => {
        try {
          // Leer el archivo Excel
          const workbook = XLSX.read(buffer, { type: 'array' });
          console.log('Workbook cargado:', workbook);
  
          // Validar que el archivo tenga al menos una hoja
          if (!workbook.SheetNames || workbook.SheetNames.length === 0) {
            throw new Error('La plantilla no contiene hojas válidas.');
          }
          console.log('Hojas disponibles:', workbook.SheetNames);
  
          // Obtener la primera hoja
          const hoja = workbook.Sheets[workbook.SheetNames[0]];
          if (!hoja) {
            throw new Error('No se pudo encontrar la hoja especificada en la plantilla.');
          }
          console.log('Hoja cargada:', hoja);
  
          // Formatear los datos
          const datosArray = [
            ['ID', 'Nombre', 'Estado', 'Tipo Financiación'], // Encabezados
            ...datos.map(item => [
              item.id,
              item.nombre,
              item.estado,
              item.tipoFinanciacion
            ])
          ];
          console.log('Datos formateados:', datosArray);
  
          // Escribir los datos desde la celda B8
          XLSX.utils.sheet_add_aoa(hoja, datosArray, { origin: 'B8' });
  
          // Ajustar el rango de la hoja
          const nuevoRango = XLSX.utils.decode_range(hoja['!ref'] ?? 'A1');
          nuevoRango.s.r = Math.min(nuevoRango.s.r, 7);
          nuevoRango.s.c = Math.min(nuevoRango.s.c, 1);
          hoja['!ref'] = XLSX.utils.encode_range(nuevoRango);
  
          // Guardar el archivo
          XLSX.writeFile(workbook, 'convocatorias_generadas.xlsx');
        } catch (error) {
          console.error('Error al procesar la plantilla:');
        }
      })
      .catch(error => {
        console.error('Error al cargar la plantilla:', error.message);
      });
  }  
 */

}
