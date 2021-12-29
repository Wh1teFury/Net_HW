import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from "@angular/core";
import { AddStudentsComponent } from "../add-students/add-students.component";
import { DataConfig, DataService } from "../data.service";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./table.component.less"],
  providers: [DataService]
})
export class TableComponent implements OnInit {

  @ViewChild(AddStudentsComponent) public _addStudent: AddStudentsComponent | undefined;

  public clickCount: number = 0;
  public isRed: boolean = false;
  public textInput: string = "";
  public inputMinDate: string = "";
  public inputMaxDate: string = "";
  public inputGPA: string = "-1";
  public searchStudent: number[] = [];
  public show: boolean | null = null;
  public showEdit: boolean | null = null;


  constructor(private dataService: DataService) { }

  public getData(): DataConfig[] {
    return this.dataService.getData();
  }
  public isSort(prop: string): void {
    (this.clickCount % 2 === 1) ? this.getData().sort(this.sortHelper(prop)) : this.getData().sort(this.sortHelper(prop)).reverse();
    this.clickCount++;
  }
  public sortHelper(prop: string): (a: DataConfig, b: DataConfig) => number {
    if (prop === "birthday") {
      return (a: DataConfig, b: DataConfig): number => {
        const dateA = this.isDate(a[prop]);
        const dateB = this.isDate(b[prop]);
        const result = (dateA < dateB) ? -1 : (dateA > dateB) ? 1 : 0;
        return result;
      };
    }
    return (a: DataConfig, b: DataConfig): number => ((a[prop] < b[prop]) ? -1 : (a[prop] > b[prop]) ? 1 : 0);
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
  public isSearchName(value: string): DataConfig[] {
    return this.getData().filter((student) => {
      return student.name.toLowerCase().includes(value.toLowerCase()) && student.name.length === value.length;
    });
  }
  public isSearchLastName(value: string): DataConfig[] {
    return this.getData().filter((student) => {
      return student.surname.toLowerCase().includes(value.toLowerCase()) && student.surname.length === value.length;
    });
  }
  public isDeleteStudent(value: number): void {
    this.getData().splice(value, 1);
  }
  public showPopUp(i: number): void {
    this.getData().map((el, index) => {
      return (index === i) ? (el.delete = true) : (el.delete = false);
    });
  }
  public closePopUp(i: number): void {
    this.getData().map((el, index) => {
      return (index === i) ? (el.delete = false) : (el.delete = false);
    });
  }
  public isFilter(minDate: string, maxDate: string, gpa: string): DataConfig[] {
    return ((minDate !== "" && maxDate !== "")) ? this.isDateFilterHelper(minDate, maxDate, gpa) : this.isGPAFilter(gpa);
  }
  public isDateFilterHelper(minDate: string, maxDate: string, gpa: string): DataConfig[] {
    return this.isGPAFilter(gpa).filter((student) => {
      return (minDate <= student.birthday.split(".").reverse().join("-")) &&
        (student.birthday.split(".").reverse().join("-") <= maxDate);
    });
  }
  public isGPAFilter(gpa: string): DataConfig[] {
    return this.getData().filter((student) => {
      return (+gpa === 0) ? student.GPA < (+gpa + 1) :
        (+gpa === 5) ? student.GPA === (+gpa) :
          (+gpa === -1) ? student.GPA > 0 :
            (+gpa) <= student.GPA && student.GPA < (+gpa) + 1;
    });
  }
  public editShowPopUp(i: number): void {
    this.showEdit = true;
    this.show = true;
    this._addStudent?.editShowPopUp(i);
  }
  public editClosePopUp(): void {
    this.showEdit = false;
    this.show = false;
    this._addStudent?.editClosePopUp();
  }
  public editSubmit(): void {
    this.showEdit = false;
    this.show = false;
    this._addStudent?.editSubmit();
  }
  ngOnInit(): void {
    console.log(this._addStudent?.studentForm.value);
  }
}
