import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {
  studentForm!: FormGroup;
  isEditMode = false;
  studentId!: number;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required]
    });

    this.route.params.subscribe(params => {
      const studentId = params['id'];
      if (studentId) {
        this.isEditMode = true;
        this.studentId = +studentId;
        this.studentService.getStudent(this.studentId).subscribe(student => {
          if (student) {
            this.studentForm.patchValue(student);
          }
        });
      }
    });
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      if (this.isEditMode) {
        this.studentService.updateStudent({ id: this.studentId, ...this.studentForm.value }).subscribe(() => {
          this.router.navigate(['/student']);
        });
      } else {
        this.studentService.addStudent(this.studentForm.value).subscribe(() => {
          this.router.navigate(['/student']);
        });
      }
    }
  }
}
