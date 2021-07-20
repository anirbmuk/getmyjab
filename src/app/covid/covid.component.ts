import { Observable } from 'rxjs';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { DataService } from './../data/data.service';
import { ITag, Robots, SeoService } from '../seo/seo.service';
import { ICovid } from './covid.data';

@UntilDestroy()
@Component({
  selector: 'app-covid',
  templateUrl: './covid.component.html',
  styleUrls: ['./covid.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CovidComponent implements OnInit {
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  readonly dataSource$: Observable<ICovid[]> = this.data.getCovidData();
  readonly displayedColumns: string[] = [
    'state',
    'active',
    'confirmed',
    'recovered',
    'deaths'
  ];
  readonly pageSize = 10;
  readonly pageSizeOptions = [
    this.pageSize * 1,
    this.pageSize * 2,
    this.pageSize * 3,
    this.pageSize * 4
  ];

  covidData: MatTableDataSource<ICovid>;

  constructor(
    private readonly data: DataService,
    private readonly seo: SeoService
  ) {}

  ngOnInit(): void {
    this.data.setNextCovidData();
    this.dataSource$.pipe(untilDestroyed(this)).subscribe(data => {
      this.covidData = new MatTableDataSource<ICovid>(data);
      if (this.paginator) {
        this.covidData.paginator = this.paginator;
      }
    });
    this.seo.setMetaTags({
      url: '/covid',
      title: 'GetMyJab (Status) - COVID-19 current status in India',
      description:
        'COVID-19 current status (active, confirmed, recovered, deaths) in India',
      image: '/assets/seo.png',
      robots: [Robots.INDEX, Robots.FOLLOW]
    } as ITag);
    this.seo.setTitle('COVID-19 current status in India');
    this.seo.setCanonical('/covid');
  }

  applyFilter(event: Event) {
    const filterValue = (event?.target as HTMLInputElement)?.value;
    this.covidData.filter = filterValue?.trim()?.toLowerCase();
  }
}
