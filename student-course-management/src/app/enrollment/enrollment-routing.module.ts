import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnrollmentListComponent } from './components/enrollment-list/enrollment-list.component';
import { EnrollmentFormComponent } from './components/enrollment-form/enrollment-form.component';

const routes: Routes = [
  { path: '', component: EnrollmentListComponent },
  { path: 'add', component: EnrollmentFormComponent },
  { path: 'edit/:id', component: EnrollmentFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnrollmentRoutingModule { }
