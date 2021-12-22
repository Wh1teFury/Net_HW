import { Component, Input } from "@angular/core";
import { DataConfig } from "../add-student/add-student.component";

@Component({
  selector: "app-setting-table",
  templateUrl: "./setting-table.component.html",
  styleUrls: ["./setting-table.component.less"]
})
export class SettingTableComponent {

  @Input()
  data: DataConfig[] = [];


  public clickCount: number = 0;
  public isRed: boolean = false;
  public textInput: string = "";
  public searchStudent: number[] = [];


  public isSort(prop: string): void {
    (this.clickCount % 2 === 1) ? this.data.sort(this.sortHelper(prop)) : this.data.sort(this.sortHelper(prop)).reverse();
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
    return this.data.filter((student) => {
      return student.name.toLowerCase().includes(value.toLowerCase()) && student.name.length === value.length;
    });
  }
  public isSearchLastName(value: string): DataConfig[] {
    return this.data.filter((student) => {
      return student.surname.toLowerCase().includes(value.toLowerCase()) && student.surname.length === value.length;
    });
  }
  public isDeleteStudent(value: number): void {
    this.data.splice(value, 1);
  }
  public showPopUp(i: number): void {
    this.data.map((el, index) => {
      return (index === i) ? (el.delete = true) : (el.delete = false);
    });
  }
  public closePopUp(i: number): void {
    this.data.map((el, index) => {
      return (index === i) ? (el.delete = false) : (el.delete = false);
    });
  }
}
