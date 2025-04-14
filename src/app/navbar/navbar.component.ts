import { Component, Input, Output, EventEmitter } from '@angular/core';

interface NavItem {
  text: string;
  link: string;
  isActive?: boolean;
  isDisabled?: boolean;
  isSpecial?: boolean;
}

@Component({
  selector: 'app-navbar',
  /* standalone: true, */
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Input() isCollapsed = false;

  navItems: NavItem[] = [
    { text: 'Inicio', link: '/inicio', isActive: true },
    { text: 'Tienda', link: '/tienda' },
    { text: 'Mapa', link: '/mapa' },
    { text: 'Noticias', link: '/noticias' },
    { text: 'Mi Perfil', link: '/miPerfil' },
    { text: 'Reciclar', link: '/reciclar', isSpecial: true },
  ];


  constructor() {}
}