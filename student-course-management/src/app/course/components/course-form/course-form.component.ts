import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {
  courseForm!: FormGroup;
  isEditMode = false;
  courseId!: number;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.courseForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      instructor: ['', Validators.required]
    });

    this.route.params.subscribe(params => {
      const courseId = params['id'];
      if (courseId) {
        this.isEditMode = true;
        this.courseId = +courseId;
        this.courseService.getCourse(this.courseId).subscribe(course => {
          if (course) {
            this.courseForm.patchValue(course);
          }
        });
      }
    });
  }

  onSubmit(): void {
    if (this.courseForm.valid) {
      if (this.isEditMode) {
        this.courseService.updateCourse({ id: this.courseId, ...this.courseForm.value }).subscribe(() => {
          this.router.navigate(['/course']);
        });
      } else {
        this.courseService.addCourse(this.courseForm.value).subscribe(() => {
          this.router.navigate(['/course']);
        });
      }
    }
  }
}
