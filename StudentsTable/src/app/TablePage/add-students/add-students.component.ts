import { ChangeDetectionStrategy, Component } from "@angular/core";
import { AbstractControl, FormGroup, Validators, ValidationErrors, FormControl } from "@angular/forms";
import { DataConfig, DataService } from "../data.service";

@Component({
  selector: "app-add-students",
  templateUrl: "./add-students.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./add-students.component.less"]
})
export class AddStudentsComponent {

  studentForm: FormGroup;
  searchId: number[] = [];

  constructor(private dataService: DataService) {
    this.studentForm = new FormGroup({
      student: new FormGroup({
        name: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(12), Validators.pattern("^[а-яА-Я a-zA-Z \-]*$")]),
        surname: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(12), Validators.pattern("^[а-яА-Я a-zA-Z \-]*$")]),
        patronymic: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(12), Validators.pattern("^[а-яА-Я a-zA-Z \-]*$")])
      }, this.isDublicate),
      birthday: new FormControl("", [Validators.required, this.isMoreTen]),
      GPA: new FormControl("0", [Validators.required])
    });
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

  public getData(): DataConfig[] {
    return this.dataService.getData();
  }

  public onSubmit(): void {
    if (this.studentForm.valid) {
      const birthday = this.studentForm.value.birthday.split("-").reverse().join(".");
      const newStudent = {
        id: this.getData().length + 1,
        name: this.studentForm.value.student.name,
        surname: this.studentForm.value.student.surname,
        patronymic: this.studentForm.value.student.patronymic,
        birthday,
        GPA: this.studentForm.value.GPA,
        delete: false,
        show: false,
      };
      this.getData().push(newStudent);
    }
    this.studentForm.setValue({
      student: {
        name: "",
        surname: "",
        patronymic: "",
      },
      birthday: "",
      GPA: "0",
    });
  }
  public editShowPopUp(i: number): void {
    const findStudent = this.getData().find((item, index) => {
      return index === i;
    });
    if (findStudent?.id !== undefined) {
      this.searchId.push(findStudent.id);
    }
    this.studentForm.setValue({
      student: {
        name: findStudent?.name,
        surname: findStudent?.surname,
        patronymic: findStudent?.patronymic,
      },
      birthday: findStudent?.birthday.split(".").reverse().join("-"),
      GPA: findStudent?.GPA,
    });
  }
  public editClosePopUp(): void {
    this.studentForm.setValue({
      student: {
        name: "",
        surname: "",
        patronymic: "",
      },
      birthday: "",
      GPA: "0",
    });
  }
  public editSubmit(): void {
    const a = this.searchId.length - 1;
    const id = this.searchId[a];
    if (this.studentForm.valid) {
      this.getData().map((item, index) => {
        if (item.id === id) {
          item.name = this.studentForm.value.student.name;
          item.surname = this.studentForm.value.student.surname;
          item.patronymic = this.studentForm.value.student.patronymic;
          item.birthday = this.studentForm.value.birthday.split("-").reverse().join(".");
          item.GPA = this.studentForm.value.GPA;
        }
        return this.getData();
      });
      this.studentForm.setValue({
        student: {
          name: "",
          surname: "",
          patronymic: "",
        },
        birthday: "",
        GPA: "0",
      });
    }
  }

}
