import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../interfaces';

export interface LoginDto { email: string; password: string; }
export interface RegisterDto extends User { password: string; }

type LoginResponse = { token: string; user: any };

const TOKEN_KEY = 'market_token_v1';
const USER_KEY  = 'market_user_v1';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = `${environment.apiUrl}/auth`;

  private userSubject = new BehaviorSubject<User | null>(this.getStoredUser());
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  get currentUser(): User | null {
    return this.userSubject.value;
  }

  register(dto: RegisterDto) {
    return this.http.post(`${this.base}/register`, dto);
  }

  login(email: string, password: string) {
    const dto: LoginDto = { email, password };
    return this.http.post<LoginResponse>(`${this.base}/login`, dto).pipe(
      tap(res => {
        localStorage.setItem(TOKEN_KEY, res.token);

        const rawRole = res.user.UserRole ??
          this.getRoleFromToken(res.token);

        const user: User = {
          id: res.user.id,
          firstName: res.user.firstName,
          lastName: res.user.lastName,
          email: res.user.email,
          age: res.user.age ?? 0,
          gender: res.user.gender ?? '',
          role: this.normalizeRole(rawRole)
        };

        this.setStoredUser(user);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  updateUser(partial: Partial<User>): void {
    const current = this.currentUser ?? ({} as User);
    const next: User = { ...current, ...partial };
    this.setStoredUser(next);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    const role = this.currentUser?.role ?? this.getRoleFromToken(this.getToken());
    return this.normalizeRole(role) === 1;
  }

  private getStoredUser(): User | null {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as User;
    if (parsed) {
      const tokenRole = this.getRoleFromToken(this.getToken());
      if (tokenRole !== undefined) {
        parsed.role = this.normalizeRole(tokenRole);
      } else if (parsed.role !== undefined) {
        parsed.role = this.normalizeRole(parsed.role);
      }
    }
    return parsed;
  }

  private setStoredUser(user: User): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    this.userSubject.next(user);
  }

  private normalizeRole(raw: any): number {
    if (raw === null || raw === undefined) return 0;
    if (typeof raw === 'number') return raw;
    if (typeof raw === 'string') {
      const val = raw.toLowerCase();
      if (val === 'admin' || val === '1') return 1;
      return 0;
    }
    if (Array.isArray(raw)) {
      return raw.some(r => this.normalizeRole(r) === 1) ? 1 : 0;
    }
    return 0;
  }

  private getRoleFromToken(token: string | null): any {
    if (!token) return undefined;
    const parts = token.split('.');
    if (parts.length !== 3) return undefined;
    try {
      const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
      return (
        payload.role ??
        payload.roles ??
        payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ??
        payload['role']
      );
    } catch {
      return undefined;
    }
  }
}
