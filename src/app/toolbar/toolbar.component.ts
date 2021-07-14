import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatRadioChange } from '@angular/material/radio';

import { DoseType, FeeType } from './../data/data.interface';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent {
  localMinimumAge: string;

  @Input() dose?: DoseType;
  @Output() doseChange = new EventEmitter<DoseType>();

  @Input() set minimumAge(value: number) {
    this.localMinimumAge = `${value}`;
  }
  @Output() minimumAgeChange = new EventEmitter<number>();

  @Input() fee: FeeType;
  @Output() feeChange = new EventEmitter<FeeType>();

  onDoseChange(event: MatRadioChange): void {
    this.doseChange.emit(event?.value as DoseType);
  }

  onMinimumAgeChange(event: MatButtonToggleChange): void {
    this.minimumAgeChange.emit(+event?.value);
  }

  onFeeChange(event: MatButtonToggleChange): void {
    this.feeChange.emit(event?.value as FeeType);
  }
}
