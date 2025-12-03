import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Enrollment } from '../../models/enrollment.model';
import { EnrollmentService } from '../../services/enrollment.service';

@Component({
  selector: 'app-enrollment-list',
  templateUrl: './enrollment-list.component.html',
  styleUrls: ['./enrollment-list.component.scss']
})
export class EnrollmentListComponent implements OnInit {
  enrollments$!: Observable<Enrollment[]>;
  displayedColumns: string[] = ['id', 'student', 'course', 'grade', 'actions'];

  constructor(private enrollmentService: EnrollmentService) { }

  ngOnInit(): void {
    this.enrollments$ = this.enrollmentService.getEnrollments();
  }

  deleteEnrollment(id: number): void {
    this.enrollmentService.deleteEnrollment(id).subscribe(() => {
      this.enrollments$ = this.enrollmentService.getEnrollments();
    });
  }
}
