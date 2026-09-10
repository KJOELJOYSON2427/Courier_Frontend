import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-stat-card',
  imports: [
    CommonModule
],
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.css'
})
export class StatCardComponent {

  @Input() title: string ='';

  @Input() value: number = 0;

  @Input() up: number =0;

  @Input() down: number = 0;
}
