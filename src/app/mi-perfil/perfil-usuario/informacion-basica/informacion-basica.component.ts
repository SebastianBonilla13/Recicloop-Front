import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';


interface UserProfile {
  name: string;
  location: string;
  institution: string;
  registrationDate: Date;
  email: string;
}

@Component({
  selector: 'app-informacion-basica',
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule
  ],
  templateUrl: './informacion-basica.component.html',
  styleUrl: './informacion-basica.component.css'
})
export class InformacionBasicaComponent implements OnInit {

  userProfile: UserProfile = {
    name: 'Sebastian Bonilla',
    location: 'Popayán, Colombia',
    institution: 'Universidad del Cauca',
    registrationDate: new Date('2025-02-22'),
    email: 'jsbonilla@ejemplo.com'
  };

  ngOnInit() {
    // Here you could fetch the user profile data from an API
  }
}
