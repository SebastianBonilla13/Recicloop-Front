import { Component } from '@angular/core';
import { HistorialReciclajeComponent } from "./historial-reciclaje/historial-reciclaje.component";

@Component({
  selector: 'app-perfil-usuario',
  imports: [HistorialReciclajeComponent],
  templateUrl: './perfil-usuario.component.html',
  styleUrl: './perfil-usuario.component.css'
})
export class PerfilUsuarioComponent {

}
