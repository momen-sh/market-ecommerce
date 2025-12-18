import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AboutService {
  getInfo(): {
    bodyKey: string;
    highlightKeys: string[];
    contact: { email: string; supportHoursKey: string };
    version: string;
  } {
    return {
      bodyKey: 'about.body',
      highlightKeys: ['about.highlight1', 'about.highlight2', 'about.highlight3', 'about.highlight4'],
      contact: {
        email: 'support@market.demo',
        supportHoursKey: 'about.supportHoursValue'
      },
      version: 'v1.0.0'
    };
  }
}
