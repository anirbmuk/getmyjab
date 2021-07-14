import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID
} from '@angular/core';

import { ITag, Robots, SeoService } from './../seo/seo.service';
import {
  ExternalLink,
  ExternalTrackingParams,
  PageViewParams,
  TrackingService
} from './../tracking/tracking.service';
import { environment } from './../../environments/environment';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent implements OnInit {
  constructor(
    private readonly seo: SeoService,
    private readonly tracking: TrackingService,
    @Inject(PLATFORM_ID) private platformId
  ) {}

  ngOnInit(): void {
    this.seo.setMetaTags({
      url: '/aboutme',
      title:
        'GetMyJab (About Me) - COVID-19 vaccination slots in Karnataka, Bengal and Maharashtra',
      description: 'About Anirban Mukherjee, the developer of GetMyJab',
      image: '/assets/seo.png',
      robots: [Robots.INDEX, Robots.FOLLOW]
    } as ITag);
    this.seo.setTitle('Anirban Mukherjee');
    this.seo.setCanonical('/aboutme');

    this.tracking.logPageViewEvent({
      screen: '/aboutme',
      page_location: isPlatformBrowser(this.platformId)
        ? window?.location.href
        : null,
      page_title: this.seo.pageTitle,
      source: this.tracking.source
    } as PageViewParams);
  }

  clickExternalLink(tag?: ExternalLink): void {
    if (!!tag) {
      this.tracking.logExternalClickEvent({
        screen: '/aboutme',
        page_location: isPlatformBrowser(this.platformId)
          ? window?.location.href
          : null,
        page_title: this.seo.pageTitle,
        tag
      } as ExternalTrackingParams);
    }
  }

  get text(): string {
    return environment.about;
  }
}
