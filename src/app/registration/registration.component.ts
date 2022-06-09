import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {RegistrationService} from "../services/reglog/registration.service";
import {RegistrationDTO} from "./registrationDTO";
import {TesterRegistrationDTO} from "./TesterRegistrationDTO";
import {OpenModalService} from "../services/shared/open-modal.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationSwitcherValue: boolean = false;
  selectableObject: string = '';
  limit: number = 1;

  notificationMessage: string = '';

  email: string = "";
  name: string = "";
  password: string = "";
  confirmPassword: string = "";
  device: string[] = [];
  OS: string[] = [];
  networks: string[] = [];
  mobileOperator: string[] = [];

  constructor(private modalService: NgbModal,
              private registrationService: RegistrationService,
              private openModalService: OpenModalService) {}

  ngOnInit(): void {
  }

  setInput(output: string[]): void {
    if(this.selectableObject == 'устройства') {
      this.device = output;
    } else if(this.selectableObject == 'ОС') {
      this.OS = output;
    } else if(this.selectableObject == 'сети') {
      this.networks = output;
    } else if(this.selectableObject == 'оператора') {
      this.mobileOperator = output;
    }
  }

  registration(confirmModal:any, notificationModal:any): void {
    if (this.password == this.confirmPassword && this.password!="") {
      if(this.registrationSwitcherValue) {
        let dto = new TesterRegistrationDTO();
        dto.email = this.email;
        dto.name = this.name;
        dto.role = "TESTER";
        dto.password = this.password
        dto.devices = this.device;
        dto.os = this.OS;
        dto.networks = this.networks;
        dto.mobileOperators = this.mobileOperator;
        this.registrationService.regTester(dto).subscribe((data: boolean) => {
          if(!data) {
            this.notificationMessage = "Тестировщик не зарегистрирован"
            this.openModalService.openNotificationBox(notificationModal)
          } else {
            this.openModalService.openConfirmationCodeBox(confirmModal);
          }
        });
      } else {
        let dto = new RegistrationDTO();
        dto.email = this.email;
        dto.name = this.name;
        dto.role = "DEVELOPER";
        dto.password = this.password;
        this.registrationService.regDeveloper(dto).subscribe((data: boolean) => {
          if(!data) {
            this.notificationMessage = "Разработчик не зарегистрирован"
            this.openModalService.openNotificationBox(notificationModal)
          } else {
            this.openModalService.openConfirmationCodeBox(confirmModal);
          }
        });
      }
    } else {
      this.notificationMessage = "Пароли не совпадают!"
      this.openModalService.openNotificationBox(notificationModal)
    }
  }

  openSelectBox(content:any, selectableObject: string, limit?: number) {
    this.selectableObject = selectableObject;
    this.limit = limit? limit : 1;
    this.openModalService.open(content, 'lg');
  }

  execDeveloperRegistration():void {
    this.registrationSwitcherValue = false;
  }

  execTesterRegistration():void {
    this.registrationSwitcherValue = true;
  }
}
