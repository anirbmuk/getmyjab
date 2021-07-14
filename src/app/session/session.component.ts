import { environment } from './../../environments/environment';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { IData, ISession, DoseType } from './../data/data.interface';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SessionComponent {
  @Input() data?: IData[];
  @Input() set field(value: DoseType) {
    this.mapper = environment.mapper[value];
  }
  mapper: string;

  trackByCenterIdFn(_: number, data: IData): number {
    return data.center_id;
  }

  trackBySessionIdFn(_: number, data: ISession): string {
    return data.session_id;
  }
}
