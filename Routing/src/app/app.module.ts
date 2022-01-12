import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { HttpClientModule } from "@angular/common/http";

import { NotFoundComponent } from "./TablePage/not-found/not-found.component";
import { routing } from "./app.routing";
import { TableModule } from "./TablePage/table.module";
import { GpaGuard } from "./gpa.guard";

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    routing,
    TableModule,
  ],
  providers: [GpaGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
