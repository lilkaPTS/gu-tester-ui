import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {observeTriggers} from "@ng-bootstrap/ng-bootstrap/util/triggers";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationSwitcherValue: boolean = true;
  selectableObject: string = '';
  limit: number = 1;

  device: string[] = [];
  OS: string[] = [];
  networks: string[] = [];
  mobileOperator: string[] = [];

  constructor(private modalService: NgbModal) {}

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


















//<<---------------------------------------- MODAL ---------------------------------------->>>
  closeResult: string = '';

  open(content:any, selectableObject: string, limit?: number) {
    this.selectableObject = selectableObject;
    this.limit = limit? limit : 1;
    this.modalService.open(content, {size:'lg', centered: true, ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  execDeveloperRegistration():void {
    this.registrationSwitcherValue = false;
  }

  execTesterRegistration():void {
    this.registrationSwitcherValue = true;
  }
}
