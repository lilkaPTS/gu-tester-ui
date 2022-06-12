import {Component, OnInit} from '@angular/core';
import {HeaderService} from "../services/shared/header.service";
import {SummaryForList} from "./list-summary/SummaryForList";
import {AuthorizedUser} from "../services/reglog/AuthorizedUser";
import {Router} from "@angular/router";
import {OpenModalService} from "../services/shared/open-modal.service";
import {ProcessOrderService} from "../services/order/process-order.service";
import {OrderService} from "../services/order/order.service";

@Component({
  selector: 'app-personal-account',
  templateUrl: './personal-account.component.html',
  styleUrls: ['./personal-account.component.css']
})

export class PersonalAccountComponent implements OnInit {

  rejectSummaryModal: any;

  authorizedUser: AuthorizedUser;

  buttonTest: string = "";

  rejected: SummaryForList[] = []

  waitingForApproval: SummaryForList[] = []

  approved: SummaryForList[] = []

  active: SummaryForList[] = []

  completed: SummaryForList[] = []

  constructor(private headerService: HeaderService,
              private router: Router,
              private openModalService: OpenModalService,
              private processOrderService: ProcessOrderService,
              private orderService: OrderService) {
    headerService.authorizedUser$.subscribe((authorizedUser) => {
      this.authorizedUser = authorizedUser;
      if(authorizedUser.role == "DEVELOPER") {
        this.buttonTest = "Создать заявку";
      } else if(authorizedUser.role == "TESTER") {
        this.buttonTest = "Редактировать профиль";
      }
    })
    this.fillSummaryLists();
  }

  fillSummaryLists() {
    if(this.authorizedUser.role == "DEVELOPER") {
      this.orderService.getAllOrderLowInfoByDeveloperEmail(this.authorizedUser.email).subscribe(data => {
        for (let i = 0; i < data.length; i++) {
          if(data[i].status == "CONFIRMATION") {
            this.waitingForApproval.push({id: data[i].orderId, text: data[i].title});
          } else if(data[i].status == "REJECT") {
            let summary: SummaryForList = {id: data[i].orderId, text: data[i].title};
            this.rejected.push(summary);
            this.waitingForApproval.push(summary);
          } else if(data[i].status == "APPROVED") {
            this.approved.push({id: data[i].orderId, text: data[i].title})
          } else if(data[i].status == 'ACTIVE') {
            this.active.push({id: data[i].orderId, text: data[i].title})
          } else if(data[i].status == 'FINISHED') {
            this.completed.push({id: data[i].orderId, text: data[i].title})
          }
        }
      });
    } else if(this.authorizedUser.role == "TESTER") {

    }
  }

  selectSummary(output: SummaryForList, content?: any) {
    if(!this.rejected.includes(output) && this.waitingForApproval.includes(output)) {
      console.log(output.text + " ждёт одобрения!");
    } else if(this.rejected.includes(output)) {
      console.log(output.text + " это отклонённый");
    } else if(this.approved.includes(output)) {
      console.log(output.text + " это одобренный");
    } else if(this.active.includes(output)) {
      console.log(output.text + " это текущий");
    } else if(this.completed.includes(output)) {
      console.log(output.text + " это законченный");
    }
  }

  func() {
    open(this.rejectSummaryModal)
  }


  iosClick(content: any) {
    this.processOrderService.setOS("iOS")
    this.router.navigate(["/create-orer-component"]);
    content.close();
  }

  androidClick(content: any) {
    this.processOrderService.setOS("Android")
    this.router.navigate(["/create-order-component"]);
    content.close();
  }

  open(content: any) {
    this.openModalService.open(content, 'sm');
  }

  ngOnInit(): void {
    if(!this.authorizedUser.email) {
     this.router.navigate(["/login-component"]);
    }
  }
}

