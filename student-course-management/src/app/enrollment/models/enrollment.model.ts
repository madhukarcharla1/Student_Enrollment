import { Student } from "c:/softwaredistribution/Angular_Project/student-course-management/src/app/student/models/student.model";
import { Course } from "c:/softwaredistribution/Angular_Project/student-course-management/src/app/course/models/course.model";

export interface Enrollment {
  id: number;
  student: Student;
  course: Course;
  grade: string;
}
