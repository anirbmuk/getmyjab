import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, exhaustMap, map, withLatestFrom } from 'rxjs/operators';

import { DoseType, FeeType, IData, ISession, IVaccine } from './data.interface';
import { ICovid } from '../covid/covid.data';

const timeZone = 'Asia/Kolkata';

export type StorageType =
  | 'tabState'
  | 'minimumAge'
  | 'dose'
  | 'firstdate'
  | 'fee'
  | 'vaccine';
export const supportedLocations: string[] = [
  'Karnataka',
  'Bengal',
  'Maharashtra'
];

@Injectable()
export class DataService {
  private start = this.getParameter('firstdate')
    ? this.addDays(
        this.getDateFromString(this.getParameter('firstdate')),
        environment.vaccineDoseGap
      )
    : this.getCurrentDate();
  private time = this.getCurrentDate();
  private todayStringDate = this.getStringDate(this.start);

  private basedate = new BehaviorSubject<Date>(
    this.getParameter('dose') === 'first' ? this.getCurrentDate() : this.start
  );
  private karnatakaZones = new BehaviorSubject<string>('');
  private bengalZones = new BehaviorSubject<string>('');
  private maharashtraZones = new BehaviorSubject<string>('');
  private refreshTime = new BehaviorSubject<Date>(this.time);
  private minimumAge = new BehaviorSubject<number>(
    this.getParameter('minimumAge')
  );
  private vaccine = new BehaviorSubject<string>(this.getParameter('vaccine'));
  private dose = new BehaviorSubject<DoseType>(
    !!this.getParameter('firstdate') && !!this.getParameter('vaccine')
      ? this.getParameter('dose')
      : 'first'
  );
  private fee = new BehaviorSubject<FeeType>(this.getParameter('fee'));
  private firstdate = new BehaviorSubject<string>(null);

  private covidData = new BehaviorSubject<string>('');

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId,
    private readonly http: HttpClient
  ) {}

  readonly basedate$ = this.basedate.asObservable();
  readonly karnatakaZones$ = this.karnatakaZones.asObservable();
  readonly bengalZones$ = this.bengalZones.asObservable();
  readonly maharashtraZones$ = this.maharashtraZones.asObservable();
  readonly refreshTime$ = this.refreshTime.asObservable();
  readonly minimumAge$ = this.minimumAge.asObservable();
  readonly vaccine$ = this.vaccine.asObservable();
  readonly dose$ = this.dose.asObservable();
  readonly fee$ = this.fee.asObservable();
  readonly firstdate$ = this.firstdate.asObservable();

  readonly covidData$ = this.covidData.asObservable();

  setNext(location = 'Karnataka'): void {
    if (location === 'Karnataka') {
      this.karnatakaZones.next(location);
    } else if (location === 'Bengal') {
      this.bengalZones.next(location);
    } else if (location === 'Maharashtra') {
      this.maharashtraZones.next(location);
    }
  }

  setNextCovidData(): void {
    this.covidData.next('fetch');
  }

  setRefreshTime(): void {
    this.refreshTime.next(
      new Date(new Date().toLocaleString('en-US', { timeZone }))
    );
  }

  public getBBMPDataForWeek1(): Observable<IData[]> {
    return this.karnatakaZones$.pipe(
      withLatestFrom(this.getWeek1()),
      exhaustMap(([next, week]) =>
        !!next ? this.getdata(environment.BBMP, week) : of([])
      )
    );
  }

  public getBBMPDataForWeek2(): Observable<IData[]> {
    return this.karnatakaZones$.pipe(
      withLatestFrom(this.getWeek2()),
      exhaustMap(([next, week]) =>
        !!next ? this.getdata(environment.BBMP, week) : of([])
      )
    );
  }

  public getBangaloreUrbanDataForWeek1(): Observable<IData[]> {
    return this.karnatakaZones$.pipe(
      withLatestFrom(this.getWeek1()),
      exhaustMap(([next, week]) =>
        !!next ? this.getdata(environment.BANGALORE_URBAN, week) : of([])
      )
    );
  }

  public getBangaloreRuralDataForWeek1(): Observable<IData[]> {
    return this.karnatakaZones$.pipe(
      withLatestFrom(this.getWeek1()),
      exhaustMap(([next, week]) =>
        !!next ? this.getdata(environment.BANGALORE_RURAL, week) : of([])
      )
    );
  }

  public getChikkaballapurDataForWeek1(): Observable<IData[]> {
    return this.karnatakaZones$.pipe(
      withLatestFrom(this.getWeek1()),
      exhaustMap(([next, week]) =>
        !!next ? this.getdata(environment.CHIKKABALLAPUR, week) : of([])
      )
    );
  }

  public getChikkaballapurDataForWeek2(): Observable<IData[]> {
    return this.karnatakaZones$.pipe(
      withLatestFrom(this.getWeek2()),
      exhaustMap(([next, week]) =>
        !!next ? this.getdata(environment.CHIKKABALLAPUR, week) : of([])
      )
    );
  }

  public getKolkataDataForWeek1(): Observable<IData[]> {
    return this.bengalZones$.pipe(
      withLatestFrom(this.getWeek1()),
      exhaustMap(([next, week]) =>
        !!next ? this.getdata(environment.KOLKATA, week) : of([])
      )
    );
  }

  public getKolkataDataForWeek2(): Observable<IData[]> {
    return this.bengalZones$.pipe(
      withLatestFrom(this.getWeek2()),
      exhaustMap(([next, week]) =>
        !!next ? this.getdata(environment.KOLKATA, week) : of([])
      )
    );
  }

  public getN24ParganasDataForWeek1(): Observable<IData[]> {
    return this.bengalZones$.pipe(
      withLatestFrom(this.getWeek1()),
      exhaustMap(([next, week]) =>
        !!next ? this.getdata(environment.N24PARGANAS, week) : of([])
      )
    );
  }

  public getN24ParganasDataForWeek2(): Observable<IData[]> {
    return this.bengalZones$.pipe(
      withLatestFrom(this.getWeek2()),
      exhaustMap(([next, week]) =>
        !!next ? this.getdata(environment.N24PARGANAS, week) : of([])
      )
    );
  }

  public getMumbaiDataForWeek1(): Observable<IData[]> {
    return this.maharashtraZones$.pipe(
      withLatestFrom(this.getWeek1()),
      exhaustMap(([next, week]) =>
        !!next ? this.getdata(environment.MUMBAI, week) : of([])
      )
    );
  }

  public getCovidData(): Observable<ICovid[]> {
    return this.covidData$.pipe(
      exhaustMap(next => (!!next ? this.getcovid() : of([])))
    );
  }

  getStringDate(date: Date): string {
    const day = `${date.getDate()}`.padStart(2, '0');
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const year = `${date.getFullYear()}`;
    return `${day}-${month}-${year}`;
  }

  getDateFromString(date: string): Date {
    const dateItems: string[] = date?.split('-');
    return new Date(+dateItems[2], +dateItems[1] - 1, +dateItems[0]);
  }

  getWeek1(): Observable<string> {
    return this.basedate$.pipe(map((dt: Date) => this.getStringDate(dt)));
  }

  getWeek1Range(): Observable<string> {
    return this.basedate$.pipe(
      withLatestFrom(this.getWeek1()),
      map(([dt, wk1]) => {
        const week1EndDate = this.addDays(dt, 6);
        return `${wk1} to ${this.getStringDate(week1EndDate)}`;
      })
    );
  }

  getWeek2(): Observable<string> {
    return this.basedate$.pipe(
      map((dt: Date) => this.getStringDate(this.addDays(dt, 7)))
    );
  }

  getWeek2Range(): Observable<string> {
    return this.basedate$.pipe(
      withLatestFrom(this.getWeek2()),
      map(([dt, wk2]) => {
        const week2EndDate = this.addDays(dt, 13);
        return `${wk2} to ${this.getStringDate(week2EndDate)}`;
      })
    );
  }

  saveParameter(param: StorageType, value: string): void {
    if (isPlatformBrowser(this.platformId)) {
      if (window?.localStorage) {
        window.localStorage.setItem(param, value);
      }
    }
  }

  getParameter(param: StorageType): any {
    if (isPlatformBrowser(this.platformId)) {
      if (!!window?.localStorage) {
        const value: any = window.localStorage.getItem(param);
        if (value === null || value === undefined) {
          return environment[param];
        }
        return value;
      }
    }
    return environment[param];
  }

  setParameter<T>(param: StorageType, value: T): void {
    this.saveParameter(param, value as unknown as string);
    (this[param] as BehaviorSubject<T>).next(value);
  }

  getDefaultTabState(): { index: number; label: string } {
    return { ...environment.tabState };
  }

  isFirstDosePresent(): boolean {
    return !!this.getParameter('firstdate') && !!this.getParameter('vaccine');
  }

  isDateChanged(): boolean {
    const currentDay = this.getStringDate(this.getCurrentDate());
    return this.todayStringDate !== currentDay;
  }

  changeBaseDate(dt?: Date): void {
    this.start = dt || this.getCurrentDate();
    this.todayStringDate = this.getStringDate(this.start);
    this.basedate.next(this.start);
  }

  getCurrentDate(): Date {
    return new Date(new Date().toLocaleString('en-US', { timeZone }));
  }

  addDays(source: Date, days: number): Date {
    const target = new Date(source.valueOf());
    const date = source.getDate();
    target.setDate(date + days);
    const now = Date.now();
    if (target.getTime() < now) {
      return this.getCurrentDate();
    }
    return target;
  }

  private getcovid(): Observable<ICovid[]> {
    return this.http
      .get<{ statewise: ICovid[] }>(environment.covid19Root)
      .pipe(
        map(data =>
          data.statewise?.filter((each: ICovid) => each.statecode !== 'UN')
        )
      );
  }

  private getdata(districtId: number, weekNum: string): Observable<IData[]> {
    return this.http
      .get<{ centers: IData[] }>(
        `${environment.calendarByDistrictRoot}?district_id=${districtId}&date=${weekNum}`
      )
      .pipe(
        map(data => data.centers),
        withLatestFrom(this.minimumAge$, this.fee$, this.dose$, this.vaccine$),
        map(([data, minimumAge, fee, dose, vaccine]) => {
          const fieldMapper = environment.mapper[dose];
          return data.filter((each: IData) => {
            const isValid =
              (fee === 'All' ? true : each.fee_type === fee) &&
              each?.sessions?.some(
                (session: ISession) =>
                  session.min_age_limit === +minimumAge &&
                  session[fieldMapper] > +environment.minimumCapacity &&
                  (dose === 'second'
                    ? session.vaccine?.toUpperCase() === vaccine
                    : true)
              );
            if (isValid) {
              each.filteredsessions = each?.sessions
                ?.filter(
                  (session: ISession) =>
                    session.min_age_limit === +minimumAge &&
                    session[fieldMapper] > +environment.minimumCapacity &&
                    (dose === 'second'
                      ? session.vaccine?.toUpperCase() === vaccine
                      : true)
                )
                .map((session: ISession) => {
                  if (each.fee_type === 'Paid') {
                    try {
                      session.fee = +(
                        each.vaccine_fees?.find(
                          (vaccine: IVaccine) =>
                            vaccine.vaccine === session.vaccine
                        )?.fee ?? '0'
                      );
                    } catch {
                      session.fee = 0;
                    }
                  }
                  return session;
                });
            }
            return isValid;
          });
        }),
        catchError(() => of([]))
      );
  }
}
