import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { DataService } from '../data/data.service';
import { ModalService } from './../modal/modal.service';

import { CovidComponent } from './covid.component';

const covidRoutes: Routes = [{ path: '', component: CovidComponent }];

@NgModule({
  declarations: [CovidComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(covidRoutes),
    MatInputModule,
    MatTableModule,
    MatPaginatorModule
  ],
  exports: [RouterModule],
  providers: [DataService, ModalService]
})
export class CovidModule {}
