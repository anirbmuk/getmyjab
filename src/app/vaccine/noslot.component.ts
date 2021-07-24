import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-noslot',
  template: `<div class="no-data">No slots available</div>`,
  styles: [
    `
      .no-data {
        color: #ff0033;
        padding-bottom: 10px;
        margin-left: 5px;
        font-size: 14px;
        font-weight: 500;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoslotComponent {}
