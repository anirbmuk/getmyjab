import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID
} from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { take } from 'rxjs/operators';

import { ITag, SeoService } from './seo/seo.service';
import { environment } from './../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  constructor(
    private readonly update: SwUpdate,
    private readonly seo: SeoService,
    @Inject(PLATFORM_ID) private readonly platformId
  ) {}

  ngOnInit(): void {
    this.seo.setMetaTags({
      url: '/',
      title:
        'GetMyJab - COVID-19 vaccination slots in Karnataka, Bengal and Maharashtra',
      description:
        'COVID-19 vaccination slots in Karnataka (BBMP, Bangalore, Urban, Rural, Chikkaballapur), Bengal and Maharashtra',
      image: '/assets/seo.png'
    } as ITag);
    if (isPlatformBrowser(this.platformId) && environment.production) {
      this.update.available.pipe(take(1)).subscribe({
        next: () =>
          this.update.activateUpdate().then(() => document.location.reload())
      });
    }
  }
}
