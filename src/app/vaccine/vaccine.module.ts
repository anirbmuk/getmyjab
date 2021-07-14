import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { DataService } from '../data/data.service';
import { ModalService } from './../modal/modal.service';

import { VaccineComponent } from './vaccine.component';
import { SessionComponent } from '../session/session.component';
import { NoslotComponent } from './noslot.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { ModalComponent } from './../modal/modal.component';
import { ScrollComponent } from './scroll/scroll.component';

const vaccineRoutes: Routes = [{ path: '', component: VaccineComponent }];

@NgModule({
  declarations: [
    VaccineComponent,
    SessionComponent,
    NoslotComponent,
    ToolbarComponent,
    ModalComponent,
    ScrollComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(vaccineRoutes),
    MatDividerModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule
  ],
  exports: [RouterModule],
  providers: [DataService, ModalService]
})
export class VaccineModule {}
