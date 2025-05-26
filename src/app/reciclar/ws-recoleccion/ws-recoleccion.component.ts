import { Component, OnInit } from '@angular/core';
import { WebsocketRecoleccionService } from '../../services/websocket-recoleccion.service';
import { isUndefined } from 'util';

@Component({
  selector: 'app-ws-recoleccion',
  imports: [],
  templateUrl: './ws-recoleccion.component.html',
  styleUrl: './ws-recoleccion.component.css'
})
export class WsRecoleccionComponent implements OnInit {

  constructor(private websocketService: WebsocketRecoleccionService) {

  }

  ngOnInit() {
    // Suscribirse al evento 'nuevaRecoleccion'
    this.websocketService.onNuevaRecoleccion((data) => {
      if (data) {
        console.log('Nueva recolección:', data);
      } else {
        console.error('Datos inválidos recibidos en "nuevaRecoleccion":');
      }
    });

    // Suscribirse al evento 'nuevoDetalle'
    this.websocketService.onNuevoDetalle((data) => {
      try {
        if (data && typeof data === 'object' && data.id && data.recoleccionId) {
          console.log('Nuevo detalle:', data);
        } else {
          console.error('Datos inválidos recibidos en "nuevoDetalle":', data);
        }
      } catch (error) {
        console.error('Error al procesar el evento "nuevoDetalle":', error);
      }
    });

    // Suscribirse al evento 'recoleccionFinalizada'
    this.websocketService.onFinalizarRecoleccion((data) => {
      if (data) {
        console.log('Recolección finalizada:', data);
      } else {
        console.error('Datos inválidos recibidos en "recoleccionFinalizada":');
      }
    });
    
  }

}
