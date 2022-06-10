import {Component, OnInit} from '@angular/core';
import {HeaderService} from "../services/shared/header.service";
import {SummaryForList} from "./list-summary/SummaryForList";
import {AuthorizedUser} from "../services/reglog/AuthorizedUser";
import {Router} from "@angular/router";

@Component({
  selector: 'app-personal-account',
  templateUrl: './personal-account.component.html',
  styleUrls: ['./personal-account.component.css']
})

export class PersonalAccountComponent implements OnInit {

  authorizedUser: AuthorizedUser;

  buttonTest: string = "";

  waitingForApproval: SummaryForList[] = [
    {id: 17, text: "Агрегатор автомоек"}
  ]

  approved: SummaryForList[] = [
    {id: 13, text: "Json processor"}
  ]

  current: SummaryForList[] = [
    {id: 7, text: "Система управления отелем"}
  ]

  completed: SummaryForList[] = [
    {id: 1, text: "Приложение для университета"},
    {id: 2, text: "Приложение для университета"},
    {id: 3, text: "Приложение для университета"},
    {id: 5, text: "Приложение для университета"},
    {id: 6, text: "Приложение для университета"},
    {id: 8, text: "Приложение для университета"},
    {id: 9, text: "Приложение для университета"},
    {id: 10, text: "Приложение для университета"},
    {id: 11, text: "Приложение для университета"},
    {id: 12, text: "Приложение для университета"},
    {id: 14, text: "Приложение для университета"},
    {id: 15, text: "Приложение для университета"},
  ]

  constructor(private headerService: HeaderService,
              private router: Router) {
    headerService.authorizedUser$.subscribe((authorizedUser) => {
      this.authorizedUser = authorizedUser;
      if(authorizedUser.role == "DEVELOPER") {
        this.buttonTest = "Создать заявку";
      } else if(authorizedUser.role == "Tester") {
        this.buttonTest = "Редактировать профиль";
      }
    })
  }

  ngOnInit(): void {
    if(!this.authorizedUser.email) {
     // this.router.navigate(["/login-component"]);
    }
  }
}

