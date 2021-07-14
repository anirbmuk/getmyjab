import { environment } from './../../environments/environment';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser, ViewportScroller, DOCUMENT } from '@angular/common';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { fromEvent, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IData, DoseType, FeeType } from './../data/data.interface';

import { supportedLocations, DataService } from './../data/data.service';
import { ITag, Robots, SeoService } from './../seo/seo.service';
import { ModalService } from './../modal/modal.service';
import {
  PageViewParams,
  TrackingParams,
  TrackingService
} from './../tracking/tracking.service';

@UntilDestroy()
@Component({
  selector: 'app-vaccine',
  templateUrl: './vaccine.component.html',
  styleUrls: ['./vaccine.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VaccineComponent implements OnInit {
  constructor(
    private readonly data: DataService,
    private readonly seo: SeoService,
    private readonly modal: ModalService,
    private readonly tracking: TrackingService,
    @Inject(PLATFORM_ID) private readonly platformId,
    @Inject(DOCUMENT) private readonly document,
    private readonly viewport: ViewportScroller
  ) {}

  readonly week1$ = this.data.getWeek1Range();
  readonly week2$ = this.data.getWeek2Range();

  selectedIndex: number;
  selectedLabel: string;
  selectedAge: number;
  selectedDose: DoseType;
  selectedFee: FeeType;

  readonly refreshTime$: Observable<Date> = this.data.refreshTime$.pipe(
    untilDestroyed(this)
  );

  readonly showScroll$: Observable<boolean> = fromEvent(
    this.document,
    'scroll'
  ).pipe(
    untilDestroyed(this),
    map(() => {
      const yCoordinate = this.viewport.getScrollPosition()?.[1];
      return yCoordinate > 0;
    })
  );

  readonly minimumAge$: Observable<number> = this.data.minimumAge$;
  readonly dose$: Observable<DoseType> = this.data.dose$;
  readonly fee$: Observable<FeeType> = this.data.fee$;

  readonly bbmpWeek1$: Observable<IData[]> = this.data
    .getBBMPDataForWeek1()
    .pipe(untilDestroyed(this));
  readonly bbmpWeek2$: Observable<IData[]> = this.data
    .getBBMPDataForWeek2()
    .pipe(untilDestroyed(this));

  readonly chikkaballapurWeek1$: Observable<IData[]> = this.data
    .getChikkaballapurDataForWeek1()
    .pipe(untilDestroyed(this));
  readonly chikkaballapurWeek2$: Observable<IData[]> = this.data
    .getChikkaballapurDataForWeek2()
    .pipe(untilDestroyed(this));

  readonly blrUrbanWeek1$: Observable<IData[]> = this.data
    .getBangaloreUrbanDataForWeek1()
    .pipe(untilDestroyed(this));

  readonly blrRuralWeek1$: Observable<IData[]> = this.data
    .getBangaloreRuralDataForWeek1()
    .pipe(untilDestroyed(this));

  readonly kolkataWeek1$: Observable<IData[]> = this.data
    .getKolkataDataForWeek1()
    .pipe(untilDestroyed(this));
  readonly kolkataWeek2$: Observable<IData[]> = this.data
    .getKolkataDataForWeek2()
    .pipe(untilDestroyed(this));

  readonly n24ParganasWeek1$: Observable<IData[]> = this.data
    .getN24ParganasDataForWeek1()
    .pipe(untilDestroyed(this));
  readonly n24ParganasWeek2$: Observable<IData[]> = this.data
    .getN24ParganasDataForWeek2()
    .pipe(untilDestroyed(this));

  readonly mumbaiWeek1$: Observable<IData[]> = this.data
    .getMumbaiDataForWeek1()
    .pipe(untilDestroyed(this));

  ngOnInit(): void {
    this.seo.setMetaTags({
      url: '/',
      title:
        'GetMyJab - COVID-19 vaccination slots in Karnataka, Bengal and Maharashtra',
      description:
        'COVID-19 vaccination slots in Karnataka (BBMP, Bangalore, Urban, Rural, Chikkaballapur), Bengal and Maharashtra',
      image: '/assets/seo.png',
      robots: [Robots.INDEX, Robots.FOLLOW]
    } as ITag);
    this.seo.setTitle(
      'COVID-19 vaccination slots in Karnataka, Bengal and Maharashtra'
    );
    this.seo.setCanonical('/');

    let state: any;
    const rawState = this.data.getParameter('tabState');
    if (typeof rawState === 'string') {
      try {
        state = JSON.parse(this.data.getParameter('tabState'));
        if (!supportedLocations.includes(state?.label)) {
          throw new Error('Unsupported location. Using default.');
        }
      } catch {
        state = this.data.getDefaultTabState();
        this.data.saveParameter('tabState', JSON.stringify(state));
      }
    } else {
      state = { ...rawState };
    }
    this.selectedIndex = state?.index;
    this.selectedLabel = state?.label;
    this.selectedAge = this.data.getParameter('minimumAge');
    this.selectedDose = this.data.getParameter('dose');
    this.data.setNext(this.selectedLabel);
    this.tracking.logPageViewEvent({
      city: this.selectedLabel,
      age: this.selectedAge,
      dose: this.selectedDose,
      screen: '/',
      page_location: isPlatformBrowser(this.platformId)
        ? window?.location.href
        : null,
      page_title: this.seo.pageTitle,
      source: this.tracking.source
    } as PageViewParams);
  }

  get firstDose(): string {
    if (this.selectedDose === 'second' && this.data.isFirstDosePresent()) {
      return `${this.data.getParameter('firstdate')?.trim()}`;
    }
    return null;
  }

  get vaccine(): string {
    if (this.selectedDose === 'second' && this.data.isFirstDosePresent()) {
      return `${this.data.getParameter('vaccine')?.trim()}`;
    }
    return null;
  }

  get displayFirstDose(): boolean {
    return this.selectedDose === 'second' && this.data.isFirstDosePresent();
  }

  onSelectedTabChange(event: MatTabChangeEvent): void {
    this.selectedIndex = event?.index;
    this.selectedLabel = event?.tab?.textLabel;
    this.data.saveParameter(
      'tabState',
      JSON.stringify({
        index: event?.index,
        label: event?.tab?.textLabel
      })
    );
    if (this.selectedDose === 'first' && this.data.isDateChanged()) {
      this.data.changeBaseDate(null);
    }
    this.data.setNext(event?.tab?.textLabel);
    this.data.setRefreshTime();
    this.tracking.logEvent('statechange', {
      city: this.selectedLabel,
      age: this.selectedAge,
      dose: this.selectedDose
    } as TrackingParams);
  }

  onAgeLimitChange(age: number): void {
    this.selectedAge = age;
    this.data.setParameter('minimumAge', age);
    if (this.selectedDose === 'first' && this.data.isDateChanged()) {
      this.data.changeBaseDate(null);
    }
    this.data.setNext(this.selectedLabel);
    this.data.setRefreshTime();
    this.tracking.logEvent('agechange', {
      city: this.selectedLabel,
      age: this.selectedAge,
      dose: this.selectedDose,
      fee: this.selectedFee
    } as TrackingParams);
  }

  onFeeChange(fee: FeeType): void {
    this.selectedFee = fee;
    this.data.setParameter('fee', fee);
    if (this.selectedDose === 'first' && this.data.isDateChanged()) {
      this.data.changeBaseDate(null);
    }
    this.data.setNext(this.selectedLabel);
    this.data.setRefreshTime();
    this.tracking.logEvent('feechange', {
      city: this.selectedLabel,
      age: this.selectedAge,
      dose: this.selectedDose,
      fee: this.selectedFee
    } as TrackingParams);
  }

  onDoseChange(dose: DoseType): void {
    this.selectedDose = dose;
    this.data.setParameter('dose', dose);
    if (dose === 'second') {
      if (!this.data.isFirstDosePresent()) {
        this.modal
          .openDateModal(this.data.getParameter('firstdate'))
          .subscribe({
            next: (data: {
              decision: boolean;
              firstdate: string;
              newdate: Date;
              vaccine: string;
            }) => {
              if (!data.decision) {
                this.selectedDose = 'first';
                this.data.setParameter('dose', 'first');
              } else {
                this.data.setParameter('firstdate', data.firstdate);
                this.data.setParameter('vaccine', data.vaccine);
                this.data.changeBaseDate(data.newdate);
                this.data.setNext(this.selectedLabel);
                this.data.setRefreshTime();
                this.tracking.logEvent('datechange', {
                  city: this.selectedLabel,
                  age: this.selectedAge,
                  dose: this.selectedDose,
                  fee: this.selectedFee
                } as TrackingParams);
              }
            }
          });
      } else {
        this.data.changeBaseDate(
          this.data.addDays(
            this.data.getDateFromString(this.data.getParameter('firstdate')),
            environment.vaccineDoseGap
          )
        );
        this.data.setNext(this.selectedLabel);
        this.data.setRefreshTime();
        this.tracking.logEvent('dosechange', {
          city: this.selectedLabel,
          age: this.selectedAge,
          dose: this.selectedDose,
          fee: this.selectedFee
        } as TrackingParams);
      }
    } else {
      if (dose === 'first') {
        this.data.changeBaseDate(null);
      }
      this.data.setNext(this.selectedLabel);
      this.data.setRefreshTime();
      this.tracking.logEvent('dosechange', {
        city: this.selectedLabel,
        age: this.selectedAge,
        dose: this.selectedDose,
        fee: this.selectedFee
      } as TrackingParams);
    }
  }

  refresh(location: string): void {
    if (this.selectedDose === 'first' && this.data.isDateChanged()) {
      this.data.changeBaseDate(null);
    }
    this.data.setNext(location);
    this.data.setRefreshTime();
    this.tracking.logEvent('refresh', {
      city: this.selectedLabel,
      age: this.selectedAge,
      dose: this.selectedDose,
      fee: this.selectedFee
    } as TrackingParams);
  }

  editFirstDose(): void {
    this.modal
      .openDateModal(
        this.data.getParameter('firstdate') as string,
        this.data.getParameter('vaccine') as string
      )
      .subscribe({
        next: (data: {
          decision: boolean;
          firstdate: string;
          newdate: Date;
          vaccine: string;
        }) => {
          if (data.decision) {
            this.data.setParameter('firstdate', data.firstdate);
            this.data.setParameter('vaccine', data.vaccine);
            this.data.changeBaseDate(data.newdate);
            this.data.setNext(this.selectedLabel);
            this.data.setRefreshTime();
            this.tracking.logEvent('datechange', {
              city: this.selectedLabel,
              age: this.selectedAge,
              dose: this.selectedDose,
              fee: this.selectedFee
            } as TrackingParams);
          }
        }
      });
  }

  onScrollToTop(): void {
    this.viewport.scrollToPosition([0, 0]);
  }
}
