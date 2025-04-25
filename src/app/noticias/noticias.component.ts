import { Component } from '@angular/core';
import { DatatableCustomComponent } from "../datatable-custom/datatable-custom.component";
import { ListarConvocatoriasComponent } from "./listar-convocatorias/listar-convocatorias.component";
import { GenerarExcelComponent } from "../generar-excel/generar-excel.component";

@Component({
  selector: 'app-noticias',
  imports: [ListarConvocatoriasComponent, GenerarExcelComponent],
  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.css'
})
export class NoticiasComponent {

}
