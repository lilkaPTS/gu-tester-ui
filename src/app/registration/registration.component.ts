import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationSwitcherValue: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  execDeveloperRegistration():void {
    this.registrationSwitcherValue = false;
  }

  execTesterRegistration():void {
    this.registrationSwitcherValue = true;
  }
}
