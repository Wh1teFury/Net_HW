import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from "@angular/router";
import { Observable } from "rxjs";
import { ApiService } from "./services/api.service";

@Injectable({
  providedIn: "root"
})
export class GpaGuard implements CanActivate {
  constructor(public apiService: ApiService, public router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<UrlTree | boolean> | Promise<UrlTree | boolean> | UrlTree | boolean {
    this.apiService.getItem(route.params["id"]).subscribe((response) => {
      if (response.GPA === 5) {
        this.router.navigate(["/table"]);
      }
    });

    return true;
  }

}
