import { Component } from '@angular/core';
import { FooterComponent } from "../main-layout/footer/footer.component";
import { LoginComponent } from "../login/login.component";

@Component({
  selector: 'app-auth-layout',
  imports: [FooterComponent, LoginComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css'
})
export class AuthLayoutComponent {

}
