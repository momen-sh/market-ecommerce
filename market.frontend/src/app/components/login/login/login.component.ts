import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  submitted = false;
  errorMessage = '';

  constructor(private router: Router, private auth: AuthService) { }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';

    if (!this.email || !this.password) {
      this.errorMessage = 'Email and password are required.';
      return;
    }

    if (!this.isValidEmail(this.email)) {
      this.errorMessage = 'Please enter a valid email address.';
      return;
    }

    const ok = this.auth.login(this.email, this.password).subscribe({
      next: () => this.router.navigate(['/']),
      error: () => (this.errorMessage = 'Invalid credentials.')
    });
  }

  private isValidEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}
