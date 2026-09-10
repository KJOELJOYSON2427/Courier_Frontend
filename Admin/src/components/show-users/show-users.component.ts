import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  faUser,
  faPlus,
  faBox,
  faChartLine,
  faTrash,
  faEnvelope,
  faSearch,
  faTimes,
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms'; // <-- Add this for ngModel
import {  UserResource } from '../../utils/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-show-users',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    MatCheckboxModule,
    FontAwesomeModule,
    FormsModule  // <-- Required for [(ngModel)]
  ],
  templateUrl: './show-users.component.html',
  styleUrl: './show-users.component.css'
})
export class ShowUsersComponent implements OnInit {
  // Icons
  userIcon = faUser;
  plus = faPlus;
  box = faBox;
  trash = faTrash;
  chart = faChartLine;
  envelope = faEnvelope;
  faSearch = faSearch;
  faTimes = faTimes;
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;
  faAnglesLeft = faAnglesLeft;
  faAnglesRight = faAnglesRight;

  users: UserResource[] = [];
  loading = false;
  page = 0;
  size = 9;
  emailFilter = '';
  idFilter?: number;
  searchQuery: string = '';
  sortDir: 'asc' | 'desc' = 'desc';
  totalElements = 0;
  totalPages = 0;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.loading = true;
    console.log(this.idFilter);
    
    this.userService.getAllUsers(
      this.page,
      this.size,
      this.emailFilter,
      this.idFilter,
      this.sortDir
    ).subscribe({
      next: (res) => {
        const pageData = res.data;
        this.users = pageData.content;
        this.totalElements = pageData.totalElements;
        this.totalPages = pageData.totalPages;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load users', err);
        this.loading = false;
      }
    });
  }

  onSearch() {
    const query = this.searchQuery.trim();
  
  // Reset filters
  this.emailFilter = '';
  this.idFilter = undefined;
    if (!query) {
    this.fetchUsers();
    return;
   }
 
  // Check if the input is a number (for ID)
  if (!isNaN(Number(query))) {
    this.idFilter = Number(query);
  } else {
    // Treat it as an email string
    this.emailFilter = query;
  }
    this.page = 0; // Reset to first page on search
    this.fetchUsers();
  }

  onClearFilters() {
    this.emailFilter = '';
    this.idFilter = undefined;
    this.page = 0;
    this.fetchUsers();
  }

  goToPage(pageNum: number) {
    if (pageNum >= 0 && pageNum < this.totalPages && pageNum !== this.page) {
      this.page = pageNum;
      this.fetchUsers();
    }
  }

  // Show max 5 page buttons intelligently
  getVisiblePages(): number[] {
    const maxButtons = 5;
    let start = Math.max(0, this.page - Math.floor(maxButtons / 2));
    let end = start + maxButtons;

    if (end > this.totalPages) {
      end = this.totalPages;
      start = Math.max(0, end - maxButtons);
    }

    return Array.from({ length: end - start }, (_, i) => start + i);
  }

  getTotalParcels(): number {
    return this.users.reduce((sum, user) => sum + user.parcelCount, 0);
  }

  getAvgParcels(): string {
    if (this.users.length === 0) return '0.0';
    const avg = this.getTotalParcels() / this.users.length;
    return avg.toFixed(1);
  }
}