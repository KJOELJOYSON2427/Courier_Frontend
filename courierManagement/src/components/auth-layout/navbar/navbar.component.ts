import { Component } from '@angular/core';
import { ThemeService } from '../../../service/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(public themeService: ThemeService) {}
}
