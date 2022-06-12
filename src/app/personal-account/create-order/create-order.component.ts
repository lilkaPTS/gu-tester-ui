import { Component, OnInit } from '@angular/core';
import {AuthorizedUser} from "../../services/reglog/AuthorizedUser";
import {HeaderService} from "../../services/shared/header.service";
import {Router} from "@angular/router";
import {OpenModalService} from "../../services/shared/open-modal.service";
import {OrderDTO} from "../../services/order/OrderDTO";
import {ProcessOrderService} from "../../services/order/process-order.service";

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {

  authorizedUser: AuthorizedUser;

  selectableObjects: string = '';

  requiredNumberOfTesters: number;
  osList: string[] = [];
  deviceManufacturers: string[] = [];
  devices: string[] = [];
  networks: string[] = [];
  mobileOperators: string[] = [];
  releaseYearString: string = '';
  contactEmail: string = '';
  sourceLink: string = '';
  orderTitle: string = '';
  orderDescription: string = '';

  constructor(
    private headerService: HeaderService,
    private processOrderService: ProcessOrderService,
    private router: Router,
    private openModalService: OpenModalService
  ) {
    headerService.authorizedUser$.subscribe((authorizedUser) => {
      this.authorizedUser = authorizedUser;
    })
    this.contactEmail = this.authorizedUser.email;
  }

  ngOnInit(): void {
    if(!this.authorizedUser.email) {
      this.router.navigate(["/login-component"]);
    }
  }

  setInput(output: string[]): void {
    if(this.selectableObjects == 'устройства') {
      this.devices = output;
    } else if(this.selectableObjects == 'ОС') {
      this.osList = output;
    } else if(this.selectableObjects == 'производителя') {
      this.deviceManufacturers = output;
    } else if(this.selectableObjects == 'сети') {
      this.networks = output;
    } else if(this.selectableObjects == 'оператора сотовой связи') {
      this.mobileOperators = output;
    }
  }

  openSelectBox(content:any, selectableObject: string, limit?: number) {
    this.selectableObjects = selectableObject;
    this.openModalService.open(content, 'lg');
  }


  createOrder():void {
    let dto = new OrderDTO();
    dto.developerEmail = this.authorizedUser.email;
    dto.sourceLink = this.sourceLink;
    dto.orderTitle = this.orderTitle;
    dto.orderDescription = this.orderDescription;
    dto.requiredNumberOfTesters = this.requiredNumberOfTesters
    dto.deviceReleaseYearStart = parseInt(this.releaseYearString.includes("-") ?
      this.releaseYearString.split("-")[0] : this.releaseYearString);
    dto.deviceReleaseYearEnd = parseInt(this.releaseYearString.includes("-") ?
      this.releaseYearString.split("-")[1] : this.releaseYearString);
    dto.contactEmail = this.contactEmail;
    dto.osList = this.osList;
    dto.devices = this.devices;
    dto.deviceManufacturers = this.deviceManufacturers;
    dto.mobileOperators =  this.mobileOperators;
    dto.networks = this.networks;
    console.log("dto -->> " + dto)
    this.processOrderService.createOrder(dto).subscribe(data => {
      if(data) {
        this.router.navigate(["/personal-account-component"])
      } else {
        alert("Что-то пошло не так!")
      }
    })
  }
}
