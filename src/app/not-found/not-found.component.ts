import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { ITag, Robots, SeoService } from './../seo/seo.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent implements OnInit {
  constructor(private readonly seo: SeoService) {}

  ngOnInit(): void {
    this.seo.setMetaTags({
      url: '/notfound',
      title:
        'GetMyJab (404) - COVID-19 vaccination slots in Karnataka, Bengal and Maharashtra',
      description: '404 page for GetMyJab application',
      image: '/assets/seo.png',
      robots: [Robots.NOINDEX, Robots.NOFOLLOW]
    } as ITag);
    this.seo.setTitle('404');
    this.seo.setCanonical('/notfound');
  }
}
