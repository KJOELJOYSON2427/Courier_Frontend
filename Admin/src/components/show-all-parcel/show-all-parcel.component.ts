import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { ParcelsService } from '../../services/parcel.service';
import { ParcelDashboardRow, ParcelPageResponse } from '../../utils/parcel';
import { FormsModule } from '@angular/forms';
import {
  faSearch,
  faFilter,
  faChevronDown,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { ToasterComponent } from '../toaster/toaster.component';
@Component({
  selector: 'app-show-all-parcel',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FontAwesomeModule,
    FormsModule,
    ToasterComponent
  ],
  templateUrl: './show-all-parcel.component.html',
  styleUrl: './show-all-parcel.component.css'
})
export class ShowAllParcelComponent implements OnInit {
  icons = faEye;
  edit = faEdit;
  delete = faTrash;
  faTimes = faTimes;
faSearch = faSearch;
faFilter = faFilter;
faChevronDown = faChevronDown;

  parcels: ParcelDashboardRow[] = [];
  loading = true;
  error: string | null = null;
// 1. Add these variables to your class
currentSortColumn: string = 'trackingNumber'; 
currentSortDir: 'asc' | 'desc' = 'desc';
// New Search State
  searchText: string = '';
  selectedSearchColumn: string = 'all';
  // Pagination state
  currentPage: number = 0;
  pageSize: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;
  hasNext: boolean = false;
  hasPrevious: boolean = false;
private searchTimeout: any;

  constructor(private parcelService: ParcelsService) {}
 @ViewChild(ToasterComponent) toast!: ToasterComponent;
  ngOnInit(): void {
    this.loadParcels();
  }
clearSearch(): void {
  this.searchText = '';
  this.currentPage = 0;
  this.loadParcels(0);
}

  loadParcels(page: number = 0): void {
    this.loading = true;
    this.error = null;
// Determine which columns to send to backend
    const searchCols = this.selectedSearchColumn === 'all' 
      ? ['senderAddress', 'recieverAddress', 'status', 'trackingNumber'] 
      : [this.selectedSearchColumn];
    this.parcelService.getParcelsWithFilter(page, 
      this.pageSize, 
      this.currentSortDir,    // Dynamic direction
    this.currentSortColumn, // Dynamic column          // Default sortColumn
      this.searchText, 
      searchCols).subscribe({
      next: (response: ParcelPageResponse) => {
        this.parcels = response.parcels;
        this.currentPage = response.currentPage;
        this.totalItems = response.totalItems;
        this.totalPages = response.totalPages;
        this.hasNext = response.hasNext;
        this.hasPrevious = response.hasPrevious;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load parcels. Please try again later.';
        this.loading = false;
        console.error('Error loading parcels:', err);
      }
    });
  }
onSearchChange() {
  clearTimeout(this.searchTimeout);
  this.searchTimeout = setTimeout(() => {
    this.currentPage = 0;
    this.loadParcels(0);
  }, 400);
}
  // Optional: Add delete functionality later
  deleteParcel(trackingNumber: string): void {
    if (confirm('Are you sure you want to delete this parcel?')) {
      // Implement delete logic here



      this.parcelService.deleteParcelByTrackingNumber(trackingNumber)
    .subscribe({
      next:(res) =>{
        if (res.success) {
          // 🔥 SHOW SUCCESS TOAST
          this.toast.show(res.message, 'success');
         // Remove deleted row instantly (optional but smooth UX)
          this.parcels = this.parcels.filter(
            p => p.trackingNumber !== trackingNumber
          );
          console.log('Delete parcel:', trackingNumber);
        } else {
          this.toast.show(res.message, 'error');
        }
      },
      error: () => {
        this.toast.show('Failed to delete parcel', 'error');
      }
    })
      

      // After deletion success: this.loadParcels();
    }
  }


  toggleSort(column: string): void {
  if (this.currentSortColumn === column) {
    this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
  } else {
    this.currentSortColumn = column;
    this.currentSortDir = 'asc'; // Default to asc for new columns
  }
  this.loadParcels(this.currentPage);
}


  onPageSizeChange(event: Event):void{
   const select = event.target as HTMLSelectElement;
   this.pageSize = +select.value;
   this.currentPage = 0; // Reset to first page
    this.loadParcels(0);
  }


  goToPage(page: number): void {
    if(page >=0 && page < this.totalPages){
      this.loadParcels(page);
    }
  }


  getPageNumber(index: number): number{
    const half = Math.floor(5 / 2);
  if (this.totalPages <= 5) return index;
  if (this.currentPage <= half) return index;
  if (this.currentPage >= this.totalPages - half - 1) return this.totalPages - 5 + index;
  return this.currentPage - half + index;
  }
}