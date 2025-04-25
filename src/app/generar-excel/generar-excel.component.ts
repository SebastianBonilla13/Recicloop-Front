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

// generar-excel.component.ts
import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { mockData } from '../data/mock-convocatorias'; // Asegúrate de que la ruta sea correcta
import { ApiResponse } from '../data/importsConvocatoria';
import { ConvocatoriaListarConFiltroProyeccion } from '../noticias/listar-convocatorias/listar-convocatorias.component';

@Component({
  selector: 'app-generar-excel',
  template: `<button (click)="exportarExcel()">Exportar Excel</button>`,
})
export class GenerarExcelComponent {
  
  respuesta: ApiResponse<ConvocatoriaListarConFiltroProyeccion> = mockData; // Datos de ejemplo

  exportarExcel(): void {
    const datosFormateados = this.respuesta.data.content.map((item, index) => ({
      '#': index + 1,
      'ID': item.id,
      'Nombre de la convocatoria': item.nombre,
      'Estado': item.estado,
      'Tipo de financiación': item.tipoFinanciacion,
    }));

    const hoja = XLSX.utils.json_to_sheet(datosFormateados);
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, 'Convocatorias');

    XLSX.writeFile(libro, 'convocatorias.xlsx');
  }
}
