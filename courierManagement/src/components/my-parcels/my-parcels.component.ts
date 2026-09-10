import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener,inject,ViewChild } from '@angular/core';
import { ParcelStatusDirective } from "../../directives/parcel-status.directive";
import { RouterLink, Router } from '@angular/router';
@Component({
  selector: 'app-my-parcels',
  imports: [CommonModule,
    RouterLink,
    ParcelStatusDirective],
  templateUrl: './my-parcels.component.html',
  styleUrl: './my-parcels.component.css'
})
export class MyParcelsComponent {
 
  constructor(private elementRef: ElementRef) {}
  private router : Router = inject(Router);
  isOpen = false;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

 
  @ViewChild('profileMenu', { static: true })
  profileMenu!: ElementRef;

   @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {

    if (!this.isOpen) return;
 console.log(event.target,"the ");
 
    const clickedInside =
      this.profileMenu.nativeElement.contains(event.target);

    if (!clickedInside) {
      this.isOpen = false;
    }
  }

   @HostListener('document:keydown.escape')
  onEscape() {
    this.isOpen = false;
  }
  closeDropdown() {
  this.isOpen = false;
}

  parcels: {
    trackingNumber:string,
    from: string;
    to: string;
    weight: string;
    date: string;
    sender: string;
    status: string;
  }[] = [
      {
        trackingNumber:"yuebubub",
        from: '101 Pine St, Seattle, WA 98101',
        to: '707 Chestnut St, New York, NY 10001',
        weight: '20 kg',
        date: '2025-01-10',
        sender: 'Jane Doe',
        status: 'Pending'
      },
      {
          trackingNumber:"yuebubub",
        from: 'Ontario',
        to: 'Michigan',
        weight: '20 kg',
        date: '2025-01-08',
        sender: 'Jane Doe',
        status: 'Delivered'
      },
      {
          trackingNumber:"yuebubub",
        from: 'Ontario',
        to: 'Michigan',
        weight: '20 kg',
        date: '2025-01-05',
        sender: 'Jane Doe',
        status: 'Cancelled'
      }
    ];

    navigateToParcelDetail(trackingNumber: string){
      this.router.navigate(['/parcel', trackingNumber])
    }

}
