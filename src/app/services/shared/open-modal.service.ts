import { Injectable } from '@angular/core';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Injectable({
  providedIn: 'root'
})
export class OpenModalService {

  closeResult: string = '';

  constructor(private modalService: NgbModal) { }

  openNotificationBox(content:any) {
    this.open(content, 'sm');
  }

  openSelectBox(content:any, selectableObject: string, limit?: number) {
    this.open(content, 'lg');
  }

  openConfirmationCodeBox(content:any) {
    this.open(content, 'md');
  }

  open(content:any, size: string) {
    this.modalService.open(content, {size : size, centered: true, ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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
}
