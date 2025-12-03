import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  students$!: Observable<Student[]>;
  displayedColumns: string[] = ['id', 'name', 'email', 'phoneNumber', 'actions'];

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.students$ = this.studentService.getStudents();
  }

  deleteStudent(id: number): void {
    this.studentService.deleteStudent(id).subscribe(() => {
      this.students$ = this.studentService.getStudents();
    });
  }
}
