import {Component, OnInit, Output} from '@angular/core';
import {Role} from "../enums/Role";
import {HeaderService} from "../services/header.service";
import {SummaryForList} from "./list-summary/SummaryForList";

@Component({
  selector: 'app-personal-account',
  templateUrl: './personal-account.component.html',
  styleUrls: ['./personal-account.component.css']
})

export class PersonalAccountComponent implements OnInit {

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





  constructor(private headerService: HeaderService) { }

  ngOnInit(): void {
  }

  setRoleNon():void {
    this.headerService.setRole(Role.Non)
  }

  setRoleTester():void {
    this.headerService.setRole(Role.Tester)
  }

  setRoleDeveloper():void {
    this.headerService.setRole(Role.Developer)
  }

  setRoleAdministrator():void {
    this.headerService.setRole(Role.Administrator)
  }
}

