import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PersonalAccountComponent} from "../../personal-account/personal-account.component";
import {HeaderService} from "../../services/shared/header.service";
import {Observable} from "rxjs";
import {LoginComponent} from "../../login/login.component";
import {AuthorizedUser} from "../../services/reglog/AuthorizedUser";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  authorizedUser: AuthorizedUser;
  isAuthorized: boolean = false;

  constructor(
    private headerService: HeaderService
  ) {
    headerService.authorizedUser$.subscribe((authorizedUser) => {
      this.authorizedUser = authorizedUser;
      this.isAuthorized = this.authorizedUser.role != null;
    })
  }

  exit(): void {
    this.headerService.setAuthorizedUser(new AuthorizedUser());
  }

  ngOnInit(): void {
  }

}
