import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { ModalComponent } from './modal.component';

import { DataService } from './../data/data.service';

export interface IModalData {
  getCurrentDate: () => Date;
  getStringDate: (arg0: Date) => string;
  getDateFromString: (arg0: string) => Date;
  addDays: (arg0: Date, arg1: number) => Date;
  firstdate: string;
  vaccine: string;
}

@Injectable()
export class ModalService {
  constructor(
    private readonly dialog: MatDialog,
    private readonly data: DataService
  ) {}

  openDateModal(
    firstdate?: string,
    vaccine?: string
  ): Observable<{
    decision: boolean;
    firstdate: string;
    newdate: Date;
    vaccine: string;
  }> {
    const dialogRef = this.dialog.open(ModalComponent, {
      disableClose: true,
      data: {
        getCurrentDate: this.data.getCurrentDate.bind(this.data),
        getStringDate: this.data.getStringDate.bind(this.data),
        getDateFromString: this.data.getDateFromString.bind(this.data),
        addDays: this.data.addDays.bind(this.data),
        firstdate,
        vaccine
      } as IModalData
    });
    return dialogRef.afterClosed().pipe(take(1));
  }
}
