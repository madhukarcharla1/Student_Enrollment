import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnrollmentRoutingModule } from './enrollment-routing.module';
import { EnrollmentListComponent } from './components/enrollment-list/enrollment-list.component';
import { EnrollmentFormComponent } from './components/enrollment-form/enrollment-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    EnrollmentListComponent,
    EnrollmentFormComponent
  ],
  imports: [
    CommonModule,
    EnrollmentRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    SharedModule
  ]
})
export class EnrollmentModule { }
