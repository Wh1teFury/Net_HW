import { Routes, RouterModule } from "@angular/router";
import { AddStudentsComponent } from "./TablePage/add-students/add-students.component";
import { TableComponent } from "./TablePage/table/table.component";
import { GpaGuard } from "../app/gpa.guard";
import { NotFoundComponent } from "./TablePage/not-found/not-found.component";

const addRoutes: Routes = [
  { path: "add", component: AddStudentsComponent },
  { path: "edit/:id", component: AddStudentsComponent, canActivate: [GpaGuard] },
];

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "table" },
  { path: "table", component: TableComponent },
  { path: "table", component: TableComponent, children: addRoutes },
  { path: "**", component: NotFoundComponent },
];

export const routing = RouterModule.forRoot(routes);
