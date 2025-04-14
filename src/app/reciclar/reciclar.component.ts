import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reciclar',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './reciclar.component.html',
  styleUrl: './reciclar.component.css'
})



export class ReciclarComponent {




  userId: number | null = null;
  locationId: number | null = null;
  points: number = 0;

  constructor(private snackBar: MatSnackBar) {
    // Prueba el SnackBar al iniciar el componente
    /* setTimeout(() => {
      this.snackBar.open('Componente iniciado', 'OK', {
        duration: 2000
      });
    }, 1000); */
  }

  addPoints() {
    this.points += 1;
  }

  isValid(): boolean {
    return this.userId !== null && this.locationId !== null && this.points > 0;
  }

  async finishProcess() {
    if (!this.isValid()) return;

    try {
      const response = await fetch(`http://localhost:3000/api/v1/usuarios/${this.userId}/${this.locationId}/${this.points}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {

        setTimeout(() => {
          /* this.snackBar.open('Proceso completado con éxito', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
          }); */
 
          this.snackBar.open('Asociacion creada con exito', 'Cerrar', {
            duration: 3000
          });
  
        }, 1000);
        
        this.resetForm();
        console.log("Asociacion creada con exito");
      } else {
        throw new Error('Error al procesar la solicitud');
      }
    } catch (error) {
      this.snackBar.open('Error al procesar la solicitud', 'Cerrar', {
        duration: 3000
      });
      console.log("Error http");
    }
  }

  private resetForm() {
    this.userId = null;
    this.locationId = null;
    this.points = 0;
  }
}
