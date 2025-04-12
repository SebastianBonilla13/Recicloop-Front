import { Component } from '@angular/core';
import { DatePickerComponent } from "../date-picker/date-picker.component";

@Component({
  selector: 'app-form',
  imports: [DatePickerComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

}
