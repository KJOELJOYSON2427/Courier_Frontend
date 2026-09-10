import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ParcelsService } from '../../services/parcel.service';
import { ToasterComponent } from '../toaster/toaster.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-parcel',
 imports: [ReactiveFormsModule, CommonModule, ToasterComponent],
  templateUrl: './show-parcel.component.html',
  styleUrl: './show-parcel.component.css'
})
export class ShowParcelComponent {
  isViewMode = false;
 parcelForm!: FormGroup;
@ViewChild(ToasterComponent) toast!: ToasterComponent;

  trackingNumber!: string;
  loading = false;
    error = '';
  constructor(private fb: FormBuilder,
   private parcelService: ParcelsService,
  private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit():void {
   
    this.parcelForm = this.fb.group({
      trackingNumber: ['', Validators.required],   // ✅ EXTRA FIELD
      from: ['', Validators.required],
      to: ['', Validators.required],
      weight: ['', Validators.required],
      cost: ['', Validators.required],
      senderName: ['', Validators.required],
      recipientName: ['', Validators.required],
      senderEmail: ['', [Validators.required, Validators.email]],
      recipientEmail: ['', [Validators.required, Validators.email]],
      date: ['', Validators.required],
      note: [''],
    })

     const mode:string = this.route.snapshot.data['mode'];

    this.isViewMode = mode === 'view';
     if (this.isViewMode) {
      this.parcelForm.disable(); // 🔥 makes entire form read-only
    }else {
  this.parcelForm.enable();
}


    // 3️⃣ Get tracking number from URL
    this.trackingNumber = this.route!.snapshot.paramMap.get('trackingNumber') ?? '';

    // 4️⃣ Fetch parcel
    this.loadParcel();

  }

  status:string =""
  onSubmit(){
  if(this.parcelForm.invalid){
    this.parcelForm.markAllAsTouched();
    return;
  }


 const payload = {
  // ===== Sender =====
  from: this.parcelForm.value.from,
  senderName: this.parcelForm.value.senderName,
  senderEmail: this.parcelForm.value.senderEmail,

  // ===== Receiver =====
  to: this.parcelForm.value.to,
  recieverName: this.parcelForm.value.recipientName,   // 👈 IMPORTANT
  receiverEmail: this.parcelForm.value.recipientEmail, // backend field name

  // ===== Parcel =====
  weight: this.parcelForm.value.weight,
  cost: this.parcelForm.value.cost,
  status: this.status,

  // ===== Meta =====
  date: this.parcelForm.value.date,
  note: this.parcelForm.value.note
};


  this.parcelService
  .updateParcelByTrackingNumber(this.trackingNumber, payload)
  .subscribe({
    next: () => {
      // ✅ SUCCESS TOAST
      this.toast.show('Parcel updated. Redirecting in 2s...', 'success');

      // ⏳ Redirect after 10 seconds
        setTimeout(() => {
          this.router.navigate(['/parcels']);
        }, 2000);
    },
    error: (err) => {
      console.error(err);

      // ❌ ERROR TOAST
      this.toast.show(
        err?.error || 'Failed to update parcel',
        'error'
      );
    }
  });

}


loadParcel(){
  this.loading =true;

  this.parcelService.getParcelByTrackingNumber(this.trackingNumber)
  .subscribe({
    next:(res) =>{
      console.log(res);
      
      // 5️⃣ Patch form
          this.parcelForm.patchValue({
            trackingNumber: res.trackingNumber,
            from: res.senderAddress,
            to: res.recieverAddress,
            weight: res.weight,
            cost: res.cost,
            senderName: res.senderName,
            recipientName: res.recieverName,
            senderEmail: res.senderEmail,
            recipientEmail: res.receiverEmail,
            date: res.createdAt,
            note: res.note
          });
          this.status = res.status
    }
  })
}
}
