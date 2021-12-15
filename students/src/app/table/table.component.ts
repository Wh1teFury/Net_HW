import { Component } from "@angular/core";

export interface DataConfig {
  [k: string]: boolean | number | string;
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  birthday: string;
  GPA: number;
  delete: boolean;
}

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.less"]
})
export class TableComponent {

  public data: DataConfig[];
  public clickCount: number = 0;
  public isRed: boolean = false;
  public textInput: string = "";
  public inputDate: string = "";
  public inputGPA: string = "-1";
  public searchStudent: number[] = [];
  public show: boolean = false;

  constructor() {
    this.data = [
      { id: 1, firstName: "Степан", lastName: "Кулагин", middleName: "Владимирович", birthday: "20.09.1995", GPA: 3.1, delete: false },
      { id: 2, firstName: "Варлам", lastName: "Русаков", middleName: "Алексеевич", birthday: "15.11.1998", GPA: 4.8, delete: false },
      { id: 3, firstName: "Леонард", lastName: "Харитонов", middleName: "Игоревич", birthday: "11.12.1997", GPA: 5.0, delete: false },
      { id: 4, firstName: "Тимофей", lastName: "Афанасьев", middleName: "Филатович", birthday: "09.01.1996", GPA: 2.9, delete: false },
      { id: 5, firstName: "Борис", lastName: "Журавлев", middleName: "Тимофеевич", birthday: "18.03.1991", GPA: 3.5, delete: false },
      { id: 6, firstName: "Игнатий", lastName: "Носков", middleName: "Андреевич", birthday: "29.07.1992", GPA: 4.1, delete: false },
      { id: 7, firstName: "Игорь", lastName: "Гуляев", middleName: "Васильевич", birthday: "05.05.1993", GPA: 4.8, delete: false },
      { id: 8, firstName: "Нинель", lastName: "Авдеев", middleName: "Михайлович", birthday: "07.04.1995", GPA: 3.9, delete: false },
      { id: 9, firstName: "Дарина", lastName: "Степанова", middleName: "Егоровна", birthday: "21.09.1996", GPA: 3.5, delete: false },
      { id: 10, firstName: "Аделина", lastName: "Одинцова", middleName: "Федотовна", birthday: "14.08.1997", GPA: 3.6, delete: false },
      { id: 11, firstName: "Лидия", lastName: "Максимова", middleName: "Сергеевна", birthday: "12.07.1998", GPA: 3.8, delete: false },
      { id: 12, firstName: "Андриана", lastName: "Громова", middleName: "Романовна", birthday: "16.02.1999", GPA: 2.8, delete: false },
      { id: 13, firstName: "Лунара", lastName: "Ситникова", middleName: "Кирилловна", birthday: "04.03.1990", GPA: 4.9, delete: false },
      { id: 14, firstName: "Анастасия", lastName: "Ширяева", middleName: "Сергеевна", birthday: "01.08.1998", GPA: 5.0, delete: false },
    ];
  }

  isSort(prop: string): void {
    (this.clickCount % 2 === 1) ? this.data.sort(this.sortHelper(prop)) : this.data.sort(this.sortHelper(prop)).reverse();
    this.clickCount++;
  }
  sortHelper(prop: string): (a: DataConfig, b: DataConfig) => number {
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
  isDate(date: string): number {
    const correctDate = new Date(date.split(".").reverse().join("-"));
    return +correctDate;
  }
  isSearch(value: string): void {
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
  isSearchName(value: string): DataConfig[] {
    return this.data.filter((student) => {
      return student.firstName.toLowerCase().includes(value.toLowerCase()) && student.firstName.length === value.length;
    });
  }
  isSearchLastName(value: string): DataConfig[] {
    return this.data.filter((student) => {
      return student.lastName.toLowerCase().includes(value.toLowerCase()) && student.lastName.length === value.length;
    });
  }
  isFilter(date: string, gpa: string): DataConfig[] {
    return (date !== "") ? this.isDateFilterHelper(date, gpa) : this.isGPAFilter(gpa);
  }
  isDateFilterHelper(value: string, gpa: string): DataConfig[] {
    return this.isGPAFilter(gpa).filter((student) => {
      return student.birthday.split(".").reverse().join("-") === value;
    });
  }
  isGPAFilter(value: string): DataConfig[] {
    return this.data.filter((student) => {
      return (+value === 0) ? student.GPA < (+value + 1) :
        (+value === 5) ? student.GPA === (+value) : (+value === -1) ? student.GPA > 0 : +value <= student.GPA && student.GPA < +value + 1;
    });
  }
  isDeleteStudent(value: number): void {
    this.data.splice(value, 1);
  }
  showPopUp(): void {
    this.show = !this.show;
  }
}
