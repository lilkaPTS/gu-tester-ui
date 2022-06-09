import { Component, OnInit } from '@angular/core';
import {LoginService} from "../services/reglog/login.service";
import {HttpErrorResponse, HttpHandler, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {HeaderService} from "../services/shared/header.service";
import {AuthorizedUser} from "../services/reglog/AuthorizedUser";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = "";
  password: string = "";


  constructor(private loginService: LoginService,
              private headerService: HeaderService,
              private router: Router) { }

  ngOnInit(): void {
  }

  authenticate(): void {
    this.loginService.authenticate(this.email, this.password).subscribe(
      (data) => {
        let authorizedUser = new AuthorizedUser();
        authorizedUser.email = data.email;
        authorizedUser.role = data.role;
        authorizedUser.name = data.name;
        authorizedUser.rating = data.rating;
        this.headerService.setAuthorizedUser(authorizedUser);
        this.router.navigate(["/personal-account-component"])
      },
      (error: HttpErrorResponse) => {
        alert(error.error.message)
      }
    );
  }

}
