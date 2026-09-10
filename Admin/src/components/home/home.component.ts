import { Component } from '@angular/core';
import { StatCardComponent } from "./stat-card/stat-card.component";
import { CommonModule } from "@angular/common";
import { PiechartComponent } from "./piechart/piechart.component";
import { RecentUsersComponent } from "./recent-users/recent-users.component";

export interface Stats {
  title: string;
  value: number;
  up: number;
  down: number;
}

@Component({
  selector: 'app-home',
  imports: [StatCardComponent,
    CommonModule,
    PiechartComponent, RecentUsersComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

  stats:Stats[] = [
    {
      title:'Users', value: 200, up:10, down:5
    },
    { title: 'Delivered Parcels', value: 2000, up: 20, down: 10 },
    { title: 'Pending Parcels', value: 100, up: 5, down: 2 },
  ]
}
