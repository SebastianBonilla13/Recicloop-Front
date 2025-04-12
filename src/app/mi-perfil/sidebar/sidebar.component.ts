import { Component, HostListener } from '@angular/core';
/* import { FontAwesomeModule } from '@fortawesome/free-solid-svg-icons'; */
import { faCoffee, faFontAwesome, faFontAwesomeFlag, faFontAwesomeLogoFull } from '@fortawesome/free-solid-svg-icons';
/* import { faFontAwesome } from '@fortawesome/free-solid-svg-icons'; */


interface SidebarLink {
  icon: string;
  text: string;
  link: string;
  isActive: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})

export class SidebarComponent {


  isCollapsed = false;
  /* brandName = '';
  subtitle = ''; */

  sidebarLinks: SidebarLink[] = [
    { text: 'Información Básica', link: '/miPerfil#info-basica', icon: 'fa-user', isActive: false },
    { text: 'Progreso', link: '/miPerfil#progreso', icon: 'fa fa-chart-line', isActive: false },
    { text: 'Logros', link: '/miPerfil#logros', icon: 'fa fa-medal', isActive: false },
    { text: 'Desafíos', link: '/miPerfil#desafios', icon: 'fa fa-tasks', isActive: false },
    { text: 'Amigos', link: '/miPerfil#amigos', icon: 'fa-users', isActive: false },
    { text: 'Historial de Canjes', link: '/miPerfil#historial', icon: 'fa-shopping-cart', isActive: false }
  ];

  /* profile = {
    name: 'Alex Morgan',
    role: 'Admin',
    image: 'https://randomuser.me/api/portraits/women/70.jpg'
  }; */

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY;

    this.sidebarLinks.forEach(link => {
      const element = document.getElementById(link.link.replace('/miPerfil#', ''));
      if (element) {
        const elementPosition = element.offsetTop;
        const elementHeight = element.offsetHeight;
        
        // Actualiza isActive basado en la posición del scroll
        link.isActive = (scrollPosition >= elementPosition && 
                        scrollPosition < elementPosition + elementHeight);
      }
    });
  
  }

}