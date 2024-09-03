import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  form: FormGroup;
  responseMessage: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      inputData: ['']
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const inputData = this.form.value.inputData;
      this.http.post<{ message: string }>('http://localhost:3000/api/data', { input: inputData })
        .subscribe(
          response => {
            this.responseMessage = response.message;
          },
          error => {
            console.error('Error occurred:', error);
          }
        );
    }
  }
}
