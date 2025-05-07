import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormField } from '@angular/material/input';
import { MatInput } from '@angular/material/input';
import { MatTableDataSource } from '@angular/material/table';

interface Recoleccion {
  usuarioId: number;
  puntoReciclajeId: number;
  fechaInicio: string;
  fechaFin: string;
  puntosTotales: number;
  numeroBotellas: number;
  puntoReciclaje: PuntoReciclaje;
}

/* export class TableBasicExample {
  displayedColumns = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
} */

interface PuntoReciclaje {
  nombre: string;
  ubicacion: string;
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
    MatChipsModule,
    MatTableModule,
    MatCardModule,
    MatFormField,

  ],
  templateUrl: './historial-reciclaje.component.html',
  styleUrl: './historial-reciclaje.component.css'
})


export class HistorialReciclajeComponent {

  detalleRecoleccion: Recoleccion[] = [];
  loading = true;
  error: string | null = null;
  event: string | null = null;


  displayedColumns = ['fechaInicio', 'ubicacion', 'numeroBotellas', 'puntosTotales'];
  dataSource!: MatTableDataSource<Recoleccion>;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }


  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchRecyclingHistory();
  }

  private fetchRecyclingHistory() {
    const userId = 23635;

    /* const url = `http://localhost:3000/api/v1/usuarios/historial-puntos-visitados/${userId}`; */
    const url = `http://localhost:3000/api/v1/usuarios/${userId}/historial-recolecciones`;


    this.http.get<Recoleccion[]>(url)
      .subscribe({
        next: (data) => {
          // Add default values for bottles and weight
          this.detalleRecoleccion = data.map(event => ({
            ...event,
            puntoReciclaje: {
              nombre: event.puntoReciclaje.nombre,
              ubicacion: event.puntoReciclaje.ubicacion
            }
          }));
          this.dataSource = new MatTableDataSource(this.detalleRecoleccion); // Asignar los datos a MatTableDataSource
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
