import { Component } from '@angular/core';
import { HistorialReciclajeComponent } from "./historial-reciclaje/historial-reciclaje.component";
import { InformacionBasicaComponent } from "./informacion-basica/informacion-basica.component";

@Component({
  selector: 'app-perfil-usuario',
  imports: [HistorialReciclajeComponent, InformacionBasicaComponent],
  templateUrl: './perfil-usuario.component.html',
  styleUrl: './perfil-usuario.component.css'
})
export class PerfilUsuarioComponent {

}
