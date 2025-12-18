import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  firstName = '';
  lastName = '';
  email = '';
  confirmEmail = '';
  password = '';
  confirmPassword = '';
  age = 0;
  gender = '';
  submitted = false;
  errorMessage = '';

  genderOptions = ['Male', 'Female', 'Other'];

  constructor(private router: Router, private auth: AuthService) {}

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';

    const age = Number(this.age);

    this.auth.register({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      age,
      gender: this.gender,
      password: this.password
    }).subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => (this.errorMessage = 'Registration failed. Please try again.')
    });
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
