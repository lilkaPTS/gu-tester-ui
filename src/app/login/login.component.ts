import { Component, OnInit } from '@angular/core';
import {LoginService} from "../services/reglog/login.service";
import {HttpErrorResponse} from "@angular/common/http";
import {HeaderService} from "../services/shared/header.service";
import {AuthorizedUser} from "../services/reglog/AuthorizedUser";
import {Router} from "@angular/router";
import {OpenModalService} from "../services/shared/open-modal.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  notificationMessage: string = "";
  email: string = "";
  password: string = "";


  constructor(private loginService: LoginService,
              private headerService: HeaderService,
              private router: Router,
              private openModalService: OpenModalService) { }

  ngOnInit(): void {
  }

  authenticate(content: any): void {
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
        this.notificationMessage = error.error.message;
        this.openModalService.openNotificationBox(content)
      }
    );
  }

}
