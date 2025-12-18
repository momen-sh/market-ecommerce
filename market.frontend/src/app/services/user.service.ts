import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../interfaces';
import { Router } from '@angular/router';

const TOKEN_KEY = 'market_token_v1';
const USER_KEY  = 'market_user_v1';
@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly storageKey = 'market_user_v1';
  private userSubject = new BehaviorSubject<User | null>(null);
  readonly user$ = this.userSubject.asObservable();

  constructor(private router: Router) {
    try {
      const raw = localStorage.getItem(this.storageKey);
      const u = raw ? JSON.parse(raw) : null;
      this.userSubject.next(u);
    } catch {
      this.userSubject.next(null);
    }
  }

  getCurrent(): User | null {
    return this.userSubject.value;
  }

  save(user: User): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(user));
    } catch {}
    this.userSubject.next({ ...user });
  }

  logout(): void {
    try {
      localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this.userSubject.next(null);
    this.router.navigate(['/login']);
    } catch {}
    this.userSubject.next(null);
  }
}
