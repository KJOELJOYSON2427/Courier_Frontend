import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { UserEdit } from '../../utils/user.model';

@Component({
  selector: 'app-user-edit-view',
  standalone: true,
  templateUrl: './user-edit-view.component.html',
  styleUrls: ['./user-edit-view.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class UserEditViewComponent implements OnInit {

  userForm!: FormGroup;
  userId!: number;

  isEditMode = false;
  loading = false;
  showSuccess = false;

  private originalValue!: UserEdit;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.isEditMode = this.route.snapshot.url.some(s => s.path === 'edit');

    this.initForm();

    if (!this.isEditMode) {
      this.userForm.disable();
    }

    this.loadUser();
  }

  private initForm(): void {
    this.userForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      country: ['', Validators.required],
      address: ['', Validators.required],
      age: [null],
      note: [''],
      feedBack: [''],
      status: [0],
      role: ['USER']
    });
  }

  private loadUser(): void {
    this.userService.getUserById(this.userId).subscribe(user => {
      this.userForm.patchValue(user);
      this.originalValue = this.userForm.getRawValue();
    });
  }

  enableEdit(): void {
    this.isEditMode = true;
    this.userForm.enable();
    this.router.navigate(['/users', this.userId, 'edit']);
  }

  cancelEdit(): void {
    if (this.userForm.dirty && !confirm('Discard unsaved changes?')) {
    return;
  }

  this.userForm.reset(this.originalValue);
  this.userForm.disable();
  this.isEditMode = false;
  this.router.navigate(['/users', this.userId]);
  }

  save(): void {
    if (this.userForm.invalid || !this.userForm.dirty) return;

    this.loading = true;

    const updatedUser: UserEdit = this.userForm.value;

    this.userService.updateUser(this.userId, updatedUser).subscribe({
      next: () => {
        this.loading = false;
        this.showSuccess = true;

        this.userForm.disable();
        this.isEditMode = false;
        this.originalValue = this.userForm.getRawValue();

        this.router.navigate(['/users', this.userId]);

        setTimeout(() => (this.showSuccess = false), 3000);
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
