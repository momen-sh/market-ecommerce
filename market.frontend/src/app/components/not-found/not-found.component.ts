import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotFoundService } from 'src/app/services/not-found.service';
import { APP_PATHS } from 'src/app/routes/paths';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  constructor(
    private router: Router,
    private notFoundService: NotFoundService
  ) {}

  ngOnInit(): void {
    const path = this.router.url || window.location.pathname;
    this.notFoundService.logMissing(path);
  }

  goHome(): void {
    this.router.navigateByUrl(APP_PATHS.home());
  }
}
