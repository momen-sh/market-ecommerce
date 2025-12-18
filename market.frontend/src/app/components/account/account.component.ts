import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../../interfaces';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, OnDestroy {
  user: User = { firstName: '', lastName: '', email: '', age: 0, gender: '' };
  isEditMode = false;
  editForm: User = { ...this.user };

  private sub?: Subscription;

  constructor(private userService: UserService, private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.sub = this.auth.user$.subscribe(u => {
      if (u) {
        this.user = { ...u };
        this.editForm = { ...u };
      } else {
        this.user = { firstName: '', lastName: '', email: '', age: 0, gender: '' };
        this.editForm = { ...this.user };
        this.router.navigate(['/login']);
      }
    });
  }

  toggleEditMode(): void {
    if (this.isEditMode) {
      this.user = { ...this.editForm };
    }
    this.isEditMode = !this.isEditMode;
  }

  saveChanges(): void {
    this.user = { ...this.editForm };
    this.userService.save(this.user);
    this.auth.updateUser(this.user);
    this.isEditMode = false;
  }

  cancelEdit(): void {
    this.editForm = { ...this.user };
    this.isEditMode = false;
  }

  logout(): void {
    this.userService.logout();
    this.auth.logout();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
