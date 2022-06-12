import {Component, OnInit} from '@angular/core';
import {HeaderService} from "../services/shared/header.service";
import {SummaryForList} from "./list-summary/SummaryForList";
import {AuthorizedUser} from "../services/reglog/AuthorizedUser";
import {Router} from "@angular/router";
import {OpenModalService} from "../services/shared/open-modal.service";
import {ProcessOrderService} from "../services/order/process-order.service";
import {OrderService} from "../services/order/order.service";
import {dashCaseToCamelCase} from "@angular/compiler/src/util";
import {TransferDataService} from "../services/shared/transfer-data.service";
import {delay, timer} from "rxjs";

@Component({
  selector: 'app-personal-account',
  templateUrl: './personal-account.component.html',
  styleUrls: ['./personal-account.component.css']
})

export class PersonalAccountComponent implements OnInit {

  header1: string = "";
  header2: string = "";
  header3: string = "";
  header4: string = "";

  waitingForApproval: SummaryForList[] = []
  approved: SummaryForList[] = []
  active: SummaryForList[] = []
  completed: SummaryForList[] = []

  adminComment: string = "";

  selectedRejectId: number;

  authorizedUser: AuthorizedUser;

  buttonText: string = "";

  rejected: SummaryForList[] = []


  constructor(private headerService: HeaderService,
              private router: Router,
              private openModalService: OpenModalService,
              private processOrderService: ProcessOrderService,
              private orderService: OrderService,
              private transferDataService: TransferDataService) {
    headerService.authorizedUser$.subscribe((authorizedUser) => {
      this.authorizedUser = authorizedUser;
      if(authorizedUser.role == "DEVELOPER") {
        this.buttonText = "Создать заявку";
        this.header1 = 'Ждут одобрения администратора';
        this.header2 = 'Одобренные';
        this.header3 = 'Текущие';
        this.header4 = 'Законченные';
      } else if(authorizedUser.role == "TESTER") {
        this.buttonText = "Редактировать профиль";
        this.header1 = 'Приглашения';
        this.header2 = 'Текущие';
        this.header3 = 'Законченные';
      } else if(authorizedUser.role == "ADMIN") {
        this.header1 = 'Ждут одобрения администратора';
        this.header2 = 'Текущие';
        this.header3 = 'Законченные';
        this.header4 = 'Устройства';
      }
    })
    this.fillSummaryLists();
  }

  fillSummaryLists() {
    if(this.authorizedUser.role == "DEVELOPER") {
      this.orderService.getAllOrderLowInfoByDeveloperEmail(this.authorizedUser.email).subscribe(data => {
        for (let i = 0; i < data.length; i++) {
          if(data[i].status == "CONFIRMATION") {
            this.waitingForApproval.push({id: data[i].orderId, text: data[i].title, status: data[i].status});
          } else if(data[i].status == "REJECT") {
            let summary: SummaryForList = {id: data[i].orderId, text: data[i].title, status: data[i].status};
            this.rejected.push(summary);
            this.waitingForApproval.push(summary);
          } else if(data[i].status == "APPROVED") {
            this.approved.push({id: data[i].orderId, text: data[i].title, status: data[i].status})
          } else if(data[i].status == 'ACTIVE') {
            this.active.push({id: data[i].orderId, text: data[i].title, status: data[i].status})
          } else if(data[i].status == 'FINISHED') {
            this.completed.push({id: data[i].orderId, text: data[i].title, status: data[i].status})
          }
        }
        this.waitingForApproval.sort((a, b) => a.id - b.id);
        this.approved.sort((a, b) => a.id - b.id);
        this.active.sort((a, b) => a.id - b.id);
        this.completed.sort((a, b) => a.id - b.id);
      });
    } else if(this.authorizedUser.role == "TESTER") {

    } else if(this.authorizedUser.role == "ADMIN") {

    }

  }

  selectSummary(output: SummaryForList, content?: any) {
    if(output.status == "CONFIRMATION") {
      console.log(output.text + " ждёт одобрения!");
    } else if(output.status == "REJECT") {
      this.selectedRejectId = output.id ? output.id : -1;
      this.orderService.getAdminCommentByOrderId(this.selectedRejectId).subscribe(data => {
        this.adminComment = data.adminComment;
      })
      this.openModalService.open(content, "md")
      console.log(output.text + " это отклонённый");
    } else if(output.status == "APPROVED") {
      console.log(output.text + " это одобренный");
    } else if(output.status == "ACTIVE") {
      console.log(output.text + " это текущий");
    } else if(output.status == "FINISHED") {
      console.log(output.text + " это законченный");
    }
  }

  removeOrder(content:any) {
    this.orderService.removeOrderByOrderId(this.selectedRejectId).subscribe(data => {
      if(data) {
        for (let i = 0; i < this.waitingForApproval.length; i++) {
          if(this.waitingForApproval[i].id == this.selectedRejectId) {
            this.waitingForApproval.splice(i, 1);
          }
        }
        alert("Заявка удалена!")
      } else {
        alert("Что-то пошло не так!")
      }
    })
    content.close();
  }

  async reopenOrder(content:any) {
    this.orderService.getOrderFullInfoByOrderId(this.selectedRejectId).subscribe( data => {
      this.transferDataService.setPrefillCreateOrder(data);
      this.router.navigate(["/create-order-component"]);
      content.close();
    })
  }


  iosClick(content: any) {
    this.processOrderService.setOS("iOS")
    this.router.navigate(["/create-order-component"])
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

