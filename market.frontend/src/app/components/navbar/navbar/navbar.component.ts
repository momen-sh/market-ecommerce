import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { SearchService } from 'src/app/services/search.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { AuthService } from 'src/app/services/auth.service';
import { TranslationService } from 'src/app/services/translation.service';
import { APP_PATHS } from 'src/app/routes/paths';

type NavLink = { labelKey?: string; label?: string; route: string };

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  searchQuery = '';
  cartCount = 0;
  private sub: Subscription | null = null;
  private linksSub?: Subscription;
  links: NavLink[] = [];
  user: any = null;
  private userSub?: Subscription;
  readonly paths = APP_PATHS;

  constructor(
    private cartService: CartService,
    private searchService: SearchService,
    private navbarService: NavbarService,
    private auth: AuthService,
    private router: Router,
    private i18n: TranslationService
  ) {}

  toggle(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  activate(link: any): void {
    this.isCollapsed = true;
  }

  onSearch(): void {
    this.searchService.setQuery(this.searchQuery);
  }

  ngOnInit(): void {
    this.sub = this.cartService.count$.subscribe((c: number) => this.cartCount = c);
    this.linksSub = this.navbarService.items$.subscribe((items: NavLink[]) => {
      this.links = items.map((it: NavLink) => ({
        labelKey: it.labelKey ?? it.label ?? '',
        label: it.label,
        route: it.route
      }));
    });
    this.userSub = this.auth.user$.subscribe(u => this.user = u);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.linksSub?.unsubscribe();
    this.userSub?.unsubscribe();
  }

  goHome(): void {
    this.isCollapsed = true;
    this.router.navigateByUrl(this.paths.home());
  }

  goCart(): void {
    this.isCollapsed = true;
    this.router.navigateByUrl(this.paths.cart());
  }

  goAddProduct(): void {
    this.isCollapsed = true;
    this.router.navigateByUrl(this.paths.addProduct());
  }

  logout(): void {
    this.auth.logout();
  }

  login(): void {
    this.isCollapsed = true;
    this.router.navigateByUrl(this.paths.login());
  }

  navigate(route: string): void {
    this.isCollapsed = true;
    this.router.navigate([route]);
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }

  toggleLang(): void {
    const next = document.documentElement.lang === 'ar' ? 'en' : 'ar';
    this.i18n.setLanguage(next as 'en' | 'ar');
  }

  get isAdmin(): boolean {
    return this.auth.isAdmin();
  }
}
