import { Component, ViewChild } from "@angular/core";
import { AbstractControl, FormGroup, Validators, ValidationErrors, FormControl } from "@angular/forms";
import { SettingTableComponent } from "../setting-table/setting-table.component";

export interface DataConfig {
  [k: string]: boolean | number | string;
  id: number;
  name: string;
  surname: string;
  patronymic: string;
  birthday: string;
  GPA: number;
  delete: boolean;
  show: boolean;
}

@Component({
  selector: "app-add-student",
  templateUrl: "./add-student.component.html",
  styleUrls: ["./add-student.component.less"]
})

export class AddStudentComponent {

  @ViewChild(SettingTableComponent) public _setting: SettingTableComponent | undefined;

  studentForm: FormGroup;
  editStudentForm: FormGroup;
  filterTable: FormGroup;

  public data: DataConfig[] = [
    { id: 1, name: "Степан", surname: "Кулагин", patronymic: "Владимирович", birthday: "20.09.1995", GPA: 3.1, delete: false, show: false },
    { id: 2, name: "Варлам", surname: "Русаков", patronymic: "Алексеевич", birthday: "15.11.1998", GPA: 4.8, delete: false, show: false },
    { id: 3, name: "Леонард", surname: "Харитонов", patronymic: "Игоревич", birthday: "11.12.1997", GPA: 5.0, delete: false, show: false },
    { id: 4, name: "Тимофей", surname: "Афанасьев", patronymic: "Филатович", birthday: "09.01.1996", GPA: 2.9, delete: false, show: false },
    { id: 5, name: "Борис", surname: "Журавлев", patronymic: "Тимофеевич", birthday: "18.03.1991", GPA: 3.5, delete: false, show: false },
    { id: 6, name: "Игнатий", surname: "Носков", patronymic: "Андреевич", birthday: "29.07.1992", GPA: 4.1, delete: false, show: false },
    { id: 7, name: "Игорь", surname: "Гуляев", patronymic: "Васильевич", birthday: "05.05.1993", GPA: 4.8, delete: false, show: false },
    { id: 8, name: "Нинель", surname: "Авдеев", patronymic: "Михайлович", birthday: "07.04.1995", GPA: 3.9, delete: false, show: false },
    { id: 9, name: "Дарина", surname: "Степанова", patronymic: "Егоровна", birthday: "21.09.1996", GPA: 3.5, delete: false, show: false },
    { id: 10, name: "Аделина", surname: "Одинцова", patronymic: "Федотовна", birthday: "14.08.1997", GPA: 3.6, delete: false, show: false },
    { id: 11, name: "Лидия", surname: "Максимова", patronymic: "Сергеевна", birthday: "12.07.1998", GPA: 3.8, delete: false, show: false },
    { id: 12, name: "Андриана", surname: "Громова", patronymic: "Романовна", birthday: "16.02.1999", GPA: 2.8, delete: false, show: false },
    { id: 13, name: "Лунара", surname: "Ситникова", patronymic: "Кирилловна", birthday: "04.03.1990", GPA: 4.9, delete: false, show: false },
    { id: 14, name: "Анастасия", surname: "Ширяева", patronymic: "Сергеевна", birthday: "01.08.1998", GPA: 5.0, delete: false, show: false },
  ];

  constructor() {
    this.studentForm = new FormGroup({
      student: new FormGroup({
        name: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(12), Validators.pattern("^[а-яА-Я a-zA-Z \-]*$")]),
        surname: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(12), Validators.pattern("^[а-яА-Я a-zA-Z \-]*$")]),
        patronymic: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(12), Validators.pattern("^[а-яА-Я a-zA-Z \-]*$")])
      }, this.isDublicate),
      birthday: new FormControl("", [Validators.required, this.isMoreTen]),
      GPA: new FormControl("", [Validators.required])
    });
    this.editStudentForm = new FormGroup({
      student: new FormGroup({
        name: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(12), Validators.pattern("^[а-яА-Я a-zA-Z \-]*$")]),
        surname: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(12), Validators.pattern("^[а-яА-Я a-zA-Z \-]*$")]),
        patronymic: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(12), Validators.pattern("^[а-яА-Я a-zA-Z \-]*$")])
      }, this.isDublicate),
      birthday: new FormControl("", [Validators.required, this.isMoreTen]),
      GPA: new FormControl("", [Validators.required])
    });
    this.filterTable = new FormGroup({
      inputMinDate: new FormControl(""),
      inputMaxDate: new FormControl(""),
      inputGPA: new FormControl("-1")
    });
  }
  public onSubmit(): void {
    if (this.studentForm.valid) {
      const birthday = this.studentForm.value.birthday.split("-").reverse().join(".");
      const newStudent = {
        id: this.data.length + 1,
        name: this.studentForm.value.student.name,
        surname: this.studentForm.value.student.surname,
        patronymic: this.studentForm.value.student.patronymic,
        birthday,
        GPA: this.studentForm.value.GPA,
        delete: false,
        show: false,
      };
      this.data.push(newStudent);
    }
  }
  private isMoreTen(control: AbstractControl): ValidationErrors | null {
    if (control.value == null) {
      return null;
    }
    const birthday = new Date(control.value);
    const birthdayYear = birthday.getFullYear();
    const currentYear = new Date().getFullYear();

    if (currentYear - 10 < birthdayYear) {
      return { "invalidAge": true };
    }
    return null;
  }
  private isDublicate(control: AbstractControl): ValidationErrors | null {
    if (control.value.name === control.value.surname) {
      return { "invalidSurname": true };
    } if (control.value.name === control.value.patronymic) {
      return { "invalidPatronymic": true };
    }
    return null;
  }
  public editShowPopUp(i: number): void {
    this.data.map((item, index) => {
      return (index === i) ? (item.show = true) : (item.show = false);
    });
    const findStudent = this.data.find((item, index) => {
      return index === i;
    });
    this.editStudentForm.setValue({
      student: {
        name: findStudent?.name,
        surname: findStudent?.surname,
        patronymic: findStudent?.patronymic,
      },
      birthday: findStudent?.birthday.split(".").reverse().join("-"),
      GPA: findStudent?.GPA,
    });
  }
  public editClosePopUp(i: number): void {
    this.data.map((item, index) => {
      return (index === i) ? (item.show = false) : (item.show = false);
    });
  }
  public editSubmit(i: number): void {
    if (this.editStudentForm.valid) {
      this.data.map((item, index) => {
        if (index === i) {
          item.name = this.editStudentForm.value.student.name;
          item.surname = this.editStudentForm.value.student.surname;
          item.patronymic = this.editStudentForm.value.student.patronymic;
          item.birthday = this.editStudentForm.value.birthday.split("-").reverse().join(".");
          item.GPA = this.editStudentForm.value.GPA;
        }
        return this.data;
      });
    }
  }
  public editSubAndClose(i: number): void {
    this.editSubmit(i);
    this.editClosePopUp(i);
  }
  isFilter(): DataConfig[] {
    return ((this.filterTable.value.inputMinDate !== "" && this.filterTable.value.inputMaxDate !== "")) ? this.isDateFilterHelper() : this.isGPAFilter();
  }
  isDateFilterHelper(): DataConfig[] {
    return this.isGPAFilter().filter((student) => {
      return (this.filterTable.value.inputMinDate <= student.birthday.split(".").reverse().join("-")) &&
        (student.birthday.split(".").reverse().join("-") <= this.filterTable.value.inputMaxDate);
    });
  }
  isGPAFilter(): DataConfig[] {
    return this.data.filter((student) => {
      return (+this.filterTable.value.inputGPA === 0) ? student.GPA < (+this.filterTable.value.inputGPA + 1) :
        (+this.filterTable.value.inputGPA === 5) ? student.GPA === (+this.filterTable.value.inputGPA) :
          (+this.filterTable.value.inputGPA === -1) ? student.GPA > 0 :
            (+this.filterTable.value.inputGPA) <= student.GPA && student.GPA < (+this.filterTable.value.inputGPA) + 1;
    });

  }
}
