import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebsocketRecoleccionService {

  private socket: Socket;

  constructor() {
    // Conectar al gateway WebSocket
    this.socket = io('http://localhost:3000', {
      withCredentials: true, // Permitir credenciales
    });
  }

  // Escuchar evento 'nuevaRecoleccion'
  onNuevaRecoleccion(callback: (data: any) => void) {
    this.socket.on('nuevaRecoleccion', callback);
  }

  // Escuchar evento 'nuevoDetalle'
  onNuevoDetalle(callback: (data: any) => void) {
    this.socket.on('nuevoDetalle', callback);
  }

  // Escuchar evento 'recoleccionFinalizada'
  onFinalizarRecoleccion(callback: (data: any) => void) {
    this.socket.on('finalizarRecoleccion', callback);
  }

}
