import { Component, OnInit } from '@angular/core';
import { AboutService } from '../../services/about.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  info: {
    bodyKey: string;
    highlightKeys: string[];
    contact: { email: string; supportHoursKey: string };
    version: string;
  } | null = null;

  constructor(private aboutService: AboutService) {}

  ngOnInit(): void {
    this.info = this.aboutService.getInfo();
  }
}
