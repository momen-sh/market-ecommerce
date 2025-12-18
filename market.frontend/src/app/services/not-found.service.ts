import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NotFoundService {
  logMissing(path: string): void {
    console.warn('Page not found:', path);
  }
}
