import { Component, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { 
  faArrowLeft, 
  faSearch, 
  faBoxOpen 
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
@Component({
  selector: 'app-all-parcels',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FaIconComponent,
    DatePipe
  ],
  templateUrl: './parcels.component.html',
  styleUrls: ['./parcels.component.css']
})
export class ParcelsComponent {

   private router = inject(Router);
  
  // Icons
  faArrowLeft = faArrowLeft;
  faSearch = faSearch;
  faBoxOpen = faBoxOpen;


  math= Math
  // Sample data - replace with your actual data/service
  parcels: any[] = [
    {
      from: 'Seattle, WA',
      date: new Date('2025-12-10'),
      recipient: 'John Doe',
      to: 'New York, NY',
      note: 'Fragile'
    },
    {
      from: 'Los Angeles, CA',
      date: new Date('2025-12-08'),
      recipient: 'Jane Smith',
      to: 'Chicago, IL',
      note: 'Express'
    },
    // Add more parcels as needed
  ];
page: number = 1;
  // Search and pagination
  searchTerm: string = '';

  // Filtered parcels
  get filteredParcels():any[]{
    if (!this.searchTerm.trim()) {
      return this.parcels;
    }

    const term = this.searchTerm.toLowerCase();
    return this.parcels.filter(
      parcel =>
        parcel.from?.toLowerCase().includes(term) ||
      parcel.to?.toLowerCase().includes(term) ||
      parcel.recipient?.toLowerCase().includes(term) ||
      parcel.note?.toLowerCase().includes(term)
    )
  }
pageSize: number = 12;
  
// Total count after filtering
  get totalFiltered(): number {
    return this.filteredParcels.length;
  }


// Currently displayed parcels (paginated)
  get displayedParcels(): any[] {
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredParcels.slice(start, end);
  }

  // Reset page when searching
  filterParcels(): void {
    this.page = 1;
  }

  routeTo(){
   this.router.navigate(['/myParcels'])
  }
}