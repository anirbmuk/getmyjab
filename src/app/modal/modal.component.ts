import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { environment } from './../../environments/environment';

import { IModalData } from './modal.service';

@Component({
  templateUrl: './modal.component.html'
})
export class ModalComponent implements OnInit {
  private dialogData: {
    decision: boolean;
    firstdate: string;
    newdate: Date;
    vaccine: string;
  };
  firstdateForm: FormGroup;
  maxDate: Date;
  readonly options: { key: string; value: string }[] = environment.options as {
    key: string;
    value: string;
  }[];
  readonly default = environment.default;

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IModalData
  ) {}

  ngOnInit(): void {
    this.maxDate = this.data.getCurrentDate();
    this.firstdateForm = new FormGroup({
      firstdate: new FormControl(
        !!this.data?.firstdate
          ? this.data.getDateFromString(this.data?.firstdate)
          : null,
        [Validators.required]
      ),
      vaccine: new FormControl(this.data?.vaccine ?? this.default, [
        Validators.required
      ])
    });
    this.dialogData = {
      decision: false,
      firstdate: null,
      newdate: null,
      vaccine: null
    };
  }

  onDialogAction(): void {
    if (this.firstdateForm.valid) {
      this.dialogData.decision = true;
      this.dialogData.firstdate = this.data.getStringDate(
        this.firstdateForm.value.firstdate
      );
      this.dialogData.newdate = this.data.addDays(
        this.firstdateForm.value.firstdate,
        environment.vaccineDoseGap
      );
      this.dialogData.vaccine = this.firstdateForm.value.vaccine;
      this.dialogRef.close(this.dialogData);
    }
  }

  closeModal(): void {
    this.dialogRef.close(this.dialogData);
  }
}
