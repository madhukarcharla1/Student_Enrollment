import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private students: Student[] = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', phoneNumber: '123-456-7890' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phoneNumber: '098-765-4321' }
  ];

  constructor() { }

  getStudents(): Observable<Student[]> {
    return of(this.students);
  }

  getStudent(id: number): Observable<Student | undefined> {
    return of(this.students.find(student => student.id === id));
  }

  addStudent(student: Student): Observable<Student> {
    const newStudent = { ...student, id: this.students.length + 1 };
    this.students.push(newStudent);
    return of(newStudent);
  }

  updateStudent(student: Student): Observable<Student> {
    const index = this.students.findIndex(s => s.id === student.id);
    this.students[index] = student;
    return of(student);
  }

  deleteStudent(id: number): Observable<any> {
    this.students = this.students.filter(student => student.id !== id);
    return of(null);
  }
}
