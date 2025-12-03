import { Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'student',
    loadChildren: () => import('./student/student.module').then(m => m.StudentModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'course',
    loadChildren: () => import('./course/course.module').then(m => m.CourseModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'enrollment',
    loadChildren: () => import('./enrollment/enrollment.module').then(m => m.EnrollmentModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  }
];
