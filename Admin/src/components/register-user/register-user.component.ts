import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})
export class RegisterUserComponent implements OnInit {

  userForm!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      fullName: ['', Validators.required],     // ✅ matches backend
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],     // ✅ required by backend
      age: [null, [Validators.required, Validators.min(1)]],
      country: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  submit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    this.userService.registerUser(this.userForm.value)
      .subscribe({
        next: (res) => {
          console.log('User created:', res);
          alert('User created successfully');
          this.userForm.reset();
          this.loading = false;
        },
        error: (err) => {
          console.error(err);
          alert(err.error?.message || 'Registration failed');
          this.loading = false;
        }
      });
  }
}
