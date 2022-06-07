import { Component, OnInit } from '@angular/core';
import {Role} from "../../enums/Role";
import {ActivatedRoute} from "@angular/router";
import {PersonalAccountComponent} from "../../personal-account/personal-account.component";
import {HeaderService} from "../../services/header.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  role$: Observable<Role>
  authorization$: Observable<boolean>

  constructor(
    private headerService: HeaderService
  ) {
    this.role$=headerService.role
    this.authorization$=headerService.authorization
  }

  ngOnInit(): void {
  }

}
