import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private courses: Course[] = [
    { id: 1, name: 'Introduction to Programming', description: 'A beginner-friendly course on programming fundamentals.', instructor: 'Dr. Smith' },
    { id: 2, name: 'Web Development Basics', description: 'Learn the essentials of HTML, CSS, and JavaScript.', instructor: 'Prof. Jones' }
  ];

  constructor() { }

  getCourses(): Observable<Course[]> {
    return of(this.courses);
  }

  getCourse(id: number): Observable<Course | undefined> {
    return of(this.courses.find(course => course.id === id));
  }

  addCourse(course: Course): Observable<Course> {
    const newCourse = { ...course, id: this.courses.length + 1 };
    this.courses.push(newCourse);
    return of(newCourse);
  }

  updateCourse(course: Course): Observable<Course> {
    const index = this.courses.findIndex(c => c.id === course.id);
    this.courses[index] = course;
    return of(course);
  }

  deleteCourse(id: number): Observable<any> {
    this.courses = this.courses.filter(course => course.id !== id);
    return of(null);
  }
}
