import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { AbstractControl, FormGroup, Validators, ValidationErrors, FormControl } from "@angular/forms";
import { ApiService } from "../../services/api.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Student } from "src/app/models/student";

@Component({
  selector: "app-add-students",
  templateUrl: "./add-students.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./add-students.component.less"]
})
export class AddStudentsComponent implements OnInit {

  studentForm: FormGroup;
  searchId: number[] = [];
  data: Student;
  id!: number;

  constructor(public apiService: ApiService, public router: Router, public activatedRoute: ActivatedRoute) {
    this.studentForm = new FormGroup({
      student: new FormGroup({
        name: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(12), Validators.pattern("^[а-яА-Я a-zA-Z \-]*$")]),
        surname: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(12), Validators.pattern("^[а-яА-Я a-zA-Z \-]*$")]),
        patronymic: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(12), Validators.pattern("^[а-яА-Я a-zA-Z \-]*$")])
      }, this.isDublicate),
      birthday: new FormControl("", [Validators.required, this.isMoreTen]),
      GPA: new FormControl("0", [Validators.required])
    });
    this.data = new Student();
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
  public onSubmit(): void {
    if (this.studentForm.valid) {
      const birthday = this.studentForm.value.birthday.split("-").reverse().join(".");
      this.data = {
        name: this.studentForm.value.student.name,
        surname: this.studentForm.value.student.surname,
        patronymic: this.studentForm.value.student.patronymic,
        birthday,
        GPA: this.studentForm.value.GPA,
        delete: false,
      };
      this.apiService.createItem(this.data).subscribe((response) => {
        this.router.navigate(["table"]);
      });
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
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params["id"];
    this.apiService.getItem(this.id).subscribe((response) => {
      this.data = response;
      this.studentForm.setValue({
        student: {
          name: response.name,
          surname: response.surname,
          patronymic: response.patronymic
        },
        birthday: response.birthday.split(".").reverse().join("-"),
        GPA: response.GPA,
      });
    });
  }
  public editSubmit(): void {
    if (this.studentForm.valid) {
      const birthday = this.studentForm.value.birthday.split("-").reverse().join(".");
      this.data = {
        name: this.studentForm.value.student.name,
        surname: this.studentForm.value.student.surname,
        patronymic: this.studentForm.value.student.patronymic,
        birthday,
        GPA: this.studentForm.value.GPA,
        delete: false,
      };
      this.apiService.updateItem(this.id, this.data).subscribe((response) => {
        this.router.navigate(["table"]);
      });
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
}
