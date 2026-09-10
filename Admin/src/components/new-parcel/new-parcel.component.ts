import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ParcelsService } from '../../services/parcel.service';
import { ParcelCreateRequest } from '../../utils/createParcelRequest';
import { CustomError } from '../../error/handleError';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Observable, startWith, map } from 'rxjs'; // ← Missing imports added
import { ToasterComponent } from '../toaster/toaster.component';

@Component({
  selector: 'app-new-parcel',
  standalone: true, // ← Important: you're using standalone component
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    ToasterComponent
],
  templateUrl: './new-parcel.component.html',
  styleUrl: './new-parcel.component.css' // Note: styleUrl (not styleUrls) for standalone
})
export class NewParcelComponent implements OnInit {
  loading = false;
  successMessage = '';
  errorMessage = '';

  parcelForm!: FormGroup;

  // Sample locations for autocomplete
  locations: string[] = [
    'Ontario, USA',
    'Saint Mary, USA',
    'New York, USA',
    'Los Angeles, USA',
    'Chicago, USA',
    'Toronto, Canada',
    'London, UK',
    'Sydney, Australia',
  ];

  filteredFromLocations!: Observable<string[]>;
  filteredToLocations!: Observable<string[]>;
isFieldInvalid(fieldName: string): boolean {
    const field = this.parcelForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  // Helper to get specific error messages
  getErrorMessage(fieldName: string): string {
    const control = this.parcelForm.get(fieldName);
    if (control?.hasError('required')) return 'This field is required';
    if (control?.hasError('email')) return 'Please enter a valid email address';
    if (control?.hasError('min')) {
      const min = control.errors?.['min'].min;
      return `Value must be at least ${min}`;
    }
    return '';
  }
  constructor(
    private fb: FormBuilder,
    private parcelService: ParcelsService
  ) {
    // Initialize the form
    this.parcelForm = this.fb.group({
      weight: ['', [Validators.required, Validators.min(1)]],
      from: ['', Validators.required],
      to: ['', Validators.required],
      senderName: ['', Validators.required],
      recipientName: ['', Validators.required],
      senderEmail: ['', [Validators.required, Validators.email]],
      recipientEmail: ['', [Validators.required, Validators.email]],
      cost: ['', [Validators.required, Validators.min(0)]],
      dimensions: [''],
      note: ['']
    });
  }

  
  @ViewChild(ToasterComponent)
  toaster!: ToasterComponent;

  
  ngOnInit(): void {
    // Setup autocomplete filtering after form is created
    this.filteredFromLocations = this.parcelForm.get('from')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );

    this.filteredToLocations = this.parcelForm.get('to')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.locations.filter(location =>
      location.toLowerCase().includes(filterValue)
    );
  }

  onSubmit(): void {
    // Reset messages
    this.successMessage = '';
    this.errorMessage = '';

    if (this.parcelForm.invalid) {
      this.parcelForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    const formValue: ParcelCreateRequest = this.parcelForm.value;

    this.parcelService.createParcel(formValue).subscribe({
      next: (response: string) => {
        this.successMessage = response || 'Parcel created successfully!';
        this.loading = false;
        this.toaster.show('Parcel created successfully', 'success');
        this.parcelForm.reset(); // Optional: reset form after success
      },
      error: (error: CustomError) => {
        this.errorMessage = error.message || 'An error occurred. Please try again.';
        this.loading = false;
                this.toaster.show('Failed to create parcel', 'error');

      },
      // complete: () => {} // optional
    });
  }
}