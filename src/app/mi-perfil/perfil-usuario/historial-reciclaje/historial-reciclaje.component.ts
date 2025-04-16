import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';

interface RecyclingEvent {
  usuarioId: number;
  puntoReciclajeId: number;
  fechaRegistro: string;
  puntosObtenidos: number;
  numeroBotellas: number;
  pesoTotal: number;
}

@Component({
  selector: 'app-historial-reciclaje',
  imports: [
    CommonModule,
    HttpClientModule,
    MatExpansionModule,
    MatIconModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatChipsModule
  ],
  templateUrl: './historial-reciclaje.component.html',
  styleUrl: './historial-reciclaje.component.css'
})
export class HistorialReciclajeComponent {
  recyclingEvents: RecyclingEvent[] = [];
  loading = true;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchRecyclingHistory();
  }

  private fetchRecyclingHistory() {
    const userId = 2; // This could be dynamic based on the logged-in user
    const url = `http://localhost:3000/api/v1/usuarios/historial-puntos-visitados/${userId}`;

    this.http.get<RecyclingEvent[]>(url)
      .subscribe({
        next: (data) => {
          // Add default values for bottles and weight
          this.recyclingEvents = data.map(event => ({
            ...event,
            numeroBotellas: 10,
            pesoTotal: 2
          }));
          this.loading = false;
        },
        error: (error) => {
          console.error('Error fetching recycling history:', error);
          this.error = 'Error al cargar el historial de reciclaje. Por favor, intente nuevamente.';
          this.loading = false;
        }
      });
  }
}
