import { Routes } from '@angular/router';
import { TiendaComponent } from './tienda/tienda.component';
import { InicioComponent } from './inicio/inicio.component';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { MapaComponent } from './mapa/mapa.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { ReciclarComponent } from './reciclar/reciclar.component';

export const routes: Routes = [
    {path:'', redirectTo: 'inicio', pathMatch: 'full'}, // Ruta por defecto
    {path: 'inicio', component: InicioComponent},
    {path: 'tienda', component: TiendaComponent},
    {path: 'mapa', component: MapaComponent},
    {path: 'noticias', component: NoticiasComponent},
    {path: 'miPerfil', component: MiPerfilComponent},
    {path: 'reciclar', component: ReciclarComponent},

];
