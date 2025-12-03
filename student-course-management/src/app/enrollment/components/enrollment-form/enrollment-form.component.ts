import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EnrollmentService } from '../../services/enrollment.service';
import { StudentService } from '../../../student/services/student.service';
import { CourseService } from '../../../course/services/course.service';
import { Student } from '../../../student/models/student.model';
import { Course } from '../../../course/models/course.model';
import { Observable } from 'rxjs';
import { Enrollment } from '../../models/enrollment.model';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-enrollment-form',
  templateUrl: './enrollment-form.component.html',
  styleUrls: ['./enrollment-form.component.scss']
})
export class EnrollmentFormComponent implements OnInit {
  enrollmentForm!: FormGroup;
  isEditMode = false;
  enrollmentId!: number;
  students$!: Observable<Student[]>;
  courses$!: Observable<Course[]>;

  constructor(
    private fb: FormBuilder,
    private enrollmentService: EnrollmentService,
    private studentService: StudentService,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.enrollmentForm = this.fb.group({
      studentId: ['', Validators.required],
      courseId: ['', Validators.required],
      grade: ['TBD', Validators.required]
    });

    this.students$ = this.studentService.getStudents();
    this.courses$ = this.courseService.getCourses();

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.enrollmentId = +params['id'];
        this.enrollmentService.getEnrollment(this.enrollmentId).subscribe(enrollment => {
          if (enrollment) {
            this.enrollmentForm.patchValue({
              studentId: enrollment.student.id,
              courseId: enrollment.course.id,
              grade: enrollment.grade
            });
          }
        });
      }
    });
  }

  onSubmit(): void {
    if (this.enrollmentForm.valid) {
      const { studentId, courseId, grade } = this.enrollmentForm.value;

      this.studentService.getStudent(studentId).pipe(
        switchMap(student => {
          if (!student) throw new Error('Student not found');
          return this.courseService.getCourse(courseId).pipe(
            switchMap(course => {
              if (!course) throw new Error('Course not found');
              
              const enrollmentData = {
                student,
                course,
                grade
              };

              if (this.isEditMode) {
                return this.enrollmentService.updateEnrollment({ id: this.enrollmentId, ...enrollmentData });
              } else {
                return this.enrollmentService.addEnrollment({ id: 0, ...enrollmentData });
              }
            })
          );
        })
      ).subscribe(() => {
        this.router.navigate(['/enrollment']);
      });
    }
  }
}
