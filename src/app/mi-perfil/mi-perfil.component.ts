import { Component } from '@angular/core';
import { SidebarComponent } from "./sidebar/sidebar.component";
import { PerfilUsuarioComponent } from "./perfil-usuario/perfil-usuario.component";
import { WsRecoleccionComponent } from "../reciclar/ws-recoleccion/ws-recoleccion.component";

@Component({
  selector: 'app-mi-perfil',
  imports: [SidebarComponent, PerfilUsuarioComponent, WsRecoleccionComponent],
  templateUrl: './mi-perfil.component.html',
  styleUrl: './mi-perfil.component.css'
})
export class MiPerfilComponent {

}
