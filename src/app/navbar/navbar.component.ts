import { Component, Input, Output, EventEmitter } from '@angular/core';

interface NavItem {
  text: string;
  link: string;
  isActive?: boolean;
  isDisabled?: boolean;
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
    { text: 'Tienda', link: '#' },
    { text: 'Mapa', link: '#' },
    { text: 'Noticias', link: '#' },
    { text: 'Mi Perfil', link: '/miPerfil' }
  ];

  constructor() {}
}