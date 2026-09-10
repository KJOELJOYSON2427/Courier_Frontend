import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],

  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
   
  email = '';
  password = '';
showPassword:boolean=false;

  submit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    console.log({
      email: this.email,
      password: this.password
    });
  }
}
