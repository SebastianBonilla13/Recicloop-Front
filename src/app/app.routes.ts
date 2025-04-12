import { Routes } from '@angular/router';
import { TiendaComponent } from './tienda/tienda.component';
import { InicioComponent } from './inicio/inicio.component';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';

export const routes: Routes = [
    {path:'', redirectTo: 'inicio', pathMatch: 'full'}, // Ruta por defecto
    {path: 'inicio', component: InicioComponent},
    {path: 'miPerfil', component: MiPerfilComponent},
];
