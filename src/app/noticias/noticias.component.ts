import { Component } from '@angular/core';
import { DatatableCustomComponent } from "../datatable-custom/datatable-custom.component";
import { ListarConvocatoriasComponent } from "./listar-convocatorias/listar-convocatorias.component";

@Component({
  selector: 'app-noticias',
  imports: [ListarConvocatoriasComponent],
  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.css'
})
export class NoticiasComponent {

}
