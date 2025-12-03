import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  courses$!: Observable<Course[]>;
  displayedColumns: string[] = ['id', 'name', 'description', 'instructor', 'actions'];

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.courses$ = this.courseService.getCourses();
  }

  deleteCourse(id: number): void {
    this.courseService.deleteCourse(id).subscribe(() => {
      this.courses$ = this.courseService.getCourses();
    });
  }
}
