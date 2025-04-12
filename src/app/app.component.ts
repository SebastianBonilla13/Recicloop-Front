import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TiendaComponent } from "./tienda/tienda.component";
import { FormComponent } from "./form/form.component";
import { DatePickerComponent } from "./date-picker/date-picker.component";
import { SidebarComponent } from "./mi-perfil/sidebar/sidebar.component";
import { PerfilUsuarioComponent } from "./mi-perfil/perfil-usuario/perfil-usuario.component";
import { NavbarComponent } from "./navbar/navbar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TiendaComponent, FormComponent, DatePickerComponent, SidebarComponent, PerfilUsuarioComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Recicloop-app';
}
