import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-parcel',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './parcel.component.html',
  styleUrl: './parcel.component.css'
})
export class ParcelComponent implements OnInit{

  private route: ActivatedRoute =inject(ActivatedRoute);
  

  trackingId!: string;

  feedback = '';


   parcel = {
    from: '101 Pine St, Seattle, WA 98101',
    to: '707 Chestnut St, New York, NY 10001',
    weight: '20 kg',
    date: '2025-01-10',
    sender: 'Jane Doe',
    senderEmail: 'jameskagunga15@gmail.com',
    receiver: 'James Doe',
    receiverEmail: 'alokmondala199@gmail.com',
    cost: '$200',
    note: 'Hold it up',
    status: 'Pending'
  };

  ngOnInit(): void {
    this.trackingId = this.route.snapshot.paramMap.get('trackingNumber') || '';
  }

  submitFeedback() {
    console.log('Feedback:', this.feedback);
    this.feedback = '';
  }

}
