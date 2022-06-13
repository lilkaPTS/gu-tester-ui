import { Component, OnInit } from '@angular/core';
import {TransferDataService} from "../../services/shared/transfer-data.service";
import {SummaryForList} from "../list-summary/SummaryForList";
import {OrderService} from "../../services/order/order.service";
import {TesterDTO} from "../../services/order/TesterDTO";
import {Router} from "@angular/router";
import {ProcessOrderService} from "../../services/order/process-order.service";

@Component({
  selector: 'app-approve-order',
  templateUrl: './approve-order.component.html',
  styleUrls: ['./approve-order.component.css']
})
export class ApproveOrderComponent implements OnInit {

  requiredTesterNumberFinal: number;
  requiredTesterNumber: number;

  status: string = "";
  selectedSummary: SummaryForList;
  testerDTO: TesterDTO[];

  approvedTestersEmails: string[] = [];
  unapprovedTestersEmails: string[] = [];

  constructor(
    private transferDataService: TransferDataService,
    private orderService: OrderService,
    private processOrderService: ProcessOrderService,
    private router: Router
  ) {
    transferDataService.selectedSummary$.subscribe(data => {
      this.selectedSummary = data
      if(this.selectedSummary.status=="APPROVED") {
        this.status = "ОДОБРЕНО";
      }
      this.orderService.getUnapprovedTestersByOrderId(this.selectedSummary.id).subscribe(data => {
        this.testerDTO = data;
        this.orderService.getOrderFullInfoByOrderId(this.selectedSummary.id).subscribe( data => {
          this.requiredTesterNumber = this.requiredTesterNumberFinal = data.requiredNumberOfTesters;
        })
      })
    });
  }

  yes(email: string) {
    let index = this.unapprovedTestersEmails.indexOf(email, 0);
    if(index>-1) {
      this.unapprovedTestersEmails.splice(index,1);
    }
    if(!this.approvedTestersEmails.includes(email)) {
      if(this.requiredTesterNumber==0) {
        alert("Набрано нужное количество тестировщиков")
      } else {
        this.approvedTestersEmails.push(email);
      }
    }
    this.requiredTesterNumber=this.requiredTesterNumberFinal - this.approvedTestersEmails.length;
  }

  no(email: string) {
    let index = this.approvedTestersEmails.indexOf(email, 0);
    if(index>-1) {
      this.approvedTestersEmails.splice(index,1);
    }
    if (!this.unapprovedTestersEmails.includes(email)) {
      this.unapprovedTestersEmails.push(email);
    }
    this.requiredTesterNumber=this.requiredTesterNumberFinal - this.approvedTestersEmails.length;
  }

  ngOnInit(): void {
    if(!this.selectedSummary.id) {
      this.router.navigate(["/login-component"]);
    }
  }

  confirm(): void {
    this.processOrderService.setApprovedTesters(this.selectedSummary.id, this.approvedTestersEmails).subscribe(data => {
      if(data) {
        this.router.navigate(["/personal-account-component"]);
      } else {
        alert("Что-то пошло не так")
      }
    })
  }

}
