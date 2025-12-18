import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NavbarService {
  private menu: Array<{ labelKey?: string; label?: string; route: string }> = [
    { labelKey: 'navbar.home', route: '/' },
    { labelKey: 'navbar.products', route: '/products' },
    // Cart moved to the right-side cart button; remove from centered menu
    { labelKey: 'navbar.account', route: '/account' },
    { labelKey: 'navbar.about', route: '/about' }
  ];

  private itemsSubject = new BehaviorSubject<Array<{ labelKey?: string; label?: string; route: string }>>(this.menu);
  readonly items$ = this.itemsSubject.asObservable();
}
