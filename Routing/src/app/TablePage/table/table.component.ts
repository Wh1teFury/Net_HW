import { Component, OnInit, ViewChild } from "@angular/core";
import { Student } from "../../models/student";
import { ApiService } from "../../services/api.service";
import { AddStudentsComponent } from "../add-students/add-students.component";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"]
})
export class TableComponent implements OnInit {

  @ViewChild(AddStudentsComponent) public _addStudent: AddStudentsComponent | undefined;

  public studentsData: any;
  public clickCount: number = 0;
  public isRed: boolean = false;
  public textInput: string = "";
  public inputMinDate: string = "";
  public inputMaxDate: string = "";
  public inputGPA: string = "-1";
  public searchStudent: number[] = [];
  public show: boolean | null = null;
  public showEdit: boolean | null = null;

  constructor(
    public apiService: ApiService,
  ) {
    this.studentsData = [];
  }
  ngOnInit(): void {
    this.getAllStudents();
  }
  getAllStudents(): void {
    this.apiService.getList().subscribe((response) => {
      this.studentsData = response;
    });
  }
  delete(id: number): void {
    this.apiService.deleteItem(id).subscribe((response) => {
      this.getAllStudents();
    });
  }
  public isSort(prop: string): void {
    (this.clickCount % 2 === 1) ? this.studentsData.sort(this.sortHelper(prop)) : this.studentsData.sort(this.sortHelper(prop)).reverse();
    this.clickCount++;
  }
  public sortHelper(prop: string): (a: Student, b: Student) => number {
    if (prop === "birthday") {
      return (a: Student, b: Student): number => {
        const dateA = this.isDate(a[prop]);
        const dateB = this.isDate(b[prop]);
        const result = (dateA < dateB) ? -1 : (dateA > dateB) ? 1 : 0;
        return result;
      };
    }
    return (a: Student, b: Student): number => ((a[prop] < b[prop]) ? -1 : (a[prop] > b[prop]) ? 1 : 0);
  }
  public isDate(date: string): number {
    const correctDate = new Date(date.split(".").reverse().join("-"));
    return +correctDate;
  }
  public isSearch(value: string): void {
    if (this.isSearchName(value).length !== 0) {
      for (const student of this.isSearchName(value)) {
        this.searchStudent.push(student.id);
      }
    }
    if (this.isSearchLastName(value).length !== 0) {
      for (const student of this.isSearchLastName(value)) {
        this.searchStudent.push(student.id);
      }
    }
    if (value === "") {
      this.searchStudent.length = 0;
    }
  }
  public isSearchName(value: string): any[] {
    return this.studentsData.filter((student: { name: string }) => {
      return student.name.toLowerCase().includes(value.toLowerCase()) && student.name.length === value.length;
    });
  }
  public isSearchLastName(value: string): any[] {
    return this.studentsData.filter((student: { surname: string }) => {
      return student.surname.toLowerCase().includes(value.toLowerCase()) && student.surname.length === value.length;
    });
  }
  public isFilter(minDate: string, maxDate: string, gpa: string): any[] {
    return ((minDate !== "" && maxDate !== "")) ? this.isDateFilterHelper(minDate, maxDate, gpa) : this.isGPAFilter(gpa);
  }
  public isDateFilterHelper(minDate: string, maxDate: string, gpa: string): any[] {
    return this.isGPAFilter(gpa).filter((student) => {
      return (minDate <= student.birthday.split(".").reverse().join("-")) &&
        (student.birthday.split(".").reverse().join("-") <= maxDate);
    });
  }
  public isGPAFilter(gpa: string): any[] {
    return this.studentsData.filter((student: { GPA: number }) => {
      return (+gpa === 0) ? student.GPA < (+gpa + 1) :
        (+gpa === 5) ? student.GPA === (+gpa) :
          (+gpa === -1) ? student.GPA > 0 :
            (+gpa) <= student.GPA && student.GPA < (+gpa) + 1;
    });
  }
  public closePopUp(i: number): void {
    this.studentsData.map((el: { delete: boolean }, index: number) => {
      return (index === i) ? (el.delete = false) : (el.delete = false);
    });
  }
  public showPopUp(i: number): void {
    this.studentsData.map((el: { delete: boolean }, index: number) => {
      return (index === i) ? (el.delete = true) : (el.delete = false);
    });
  }
}
