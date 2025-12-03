import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Enrollment } from '../models/enrollment.model';
import { StudentService } from '../../student/services/student.service';
import { CourseService } from '../../course/services/course.service';
import { Student } from '../../student/models/student.model';
import { Course } from '../../course/models/course.model';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private enrollments: Enrollment[] = [];

  constructor(private studentService: StudentService, private courseService: CourseService) {
    this.initializeEnrollments();
  }

  private initializeEnrollments(): void {
    let students: Student[] = [];
    let courses: Course[] = [];

    this.studentService.getStudents().subscribe(s => students = s);
    this.courseService.getCourses().subscribe(c => courses = c);

    if (students.length > 0 && courses.length > 0) {
      this.enrollments = [
        { id: 1, student: students[0], course: courses[0], grade: 'A' },
        { id: 2, student: students[1], course: courses[1], grade: 'B' }
      ];
    }
  }

  getEnrollments(): Observable<Enrollment[]> {
    return of(this.enrollments);
  }

  getEnrollment(id: number): Observable<Enrollment | undefined> {
    return of(this.enrollments.find(enrollment => enrollment.id === id));
  }

  addEnrollment(enrollment: Enrollment): Observable<Enrollment> {
    const newEnrollment = { ...enrollment, id: this.enrollments.length + 1 };
    this.enrollments.push(newEnrollment);
    return of(newEnrollment);
  }

  updateEnrollment(enrollment: Enrollment): Observable<Enrollment> {
    const index = this.enrollments.findIndex(e => e.id === enrollment.id);
    this.enrollments[index] = enrollment;
    return of(enrollment);
  }

  deleteEnrollment(id: number): Observable<any> {
    this.enrollments = this.enrollments.filter(enrollment => enrollment.id !== id);
    return of(null);
  }
}
