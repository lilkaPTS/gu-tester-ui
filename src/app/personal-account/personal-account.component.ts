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
import {OrderLowInfoDTO} from "../services/order/OrderLowInfoDTO";

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

  list1: SummaryForList[] = []
  list2: SummaryForList[] = []
  list3: SummaryForList[] = []
  list4: SummaryForList[] = []

  buttonText1: string = "";
  buttonText2: string = "";

  adminComment: string = "";

  selectedList1: number;

  authorizedUser: AuthorizedUser;





  constructor(private headerService: HeaderService,
              private router: Router,
              private openModalService: OpenModalService,
              private processOrderService: ProcessOrderService,
              private orderService: OrderService,
              private transferDataService: TransferDataService) {
    headerService.authorizedUser$.subscribe((authorizedUser) => {
      this.authorizedUser = authorizedUser;
      if(authorizedUser.role == "DEVELOPER") {
        this.buttonText1 = "Создать заявку";
        this.buttonText2 = "Редактировать профиль";
        this.header1 = 'Ждут одобрения администратора';
        this.header2 = 'Одобренные';
        this.header3 = 'Текущие';
        this.header4 = 'Законченные';
      } else if(authorizedUser.role == "TESTER") {
        this.buttonText1 = "Добавить устройство";
        this.buttonText2 = "Редактировать профиль";
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
        this.fillingLists(data);
      });
    } else if(this.authorizedUser.role == "TESTER") {

    } else if(this.authorizedUser.role == "ADMIN") {
      this.orderService.getAllOrderLowInfo().subscribe(data => {
        this.fillingLists(data);
      })
    }

  }

  private fillingLists(data: OrderLowInfoDTO[]) {
    for (let i = 0; i < data.length; i++) {
      if(data[i].status == "CONFIRMATION") {
        this.list1.push({id: data[i].orderId, text: data[i].title, status: data[i].status});
      } else if(data[i].status == "REJECT" && this.authorizedUser.role=="DEVELOPER") {
        this.list1.push({id: data[i].orderId, text: data[i].title, status: data[i].status});
      } else if(data[i].status == "APPROVED" && this.authorizedUser.role=="DEVELOPER") {
        this.list2.push({id: data[i].orderId, text: data[i].title, status: data[i].status})
      } else if(data[i].status == 'ACTIVE') {
        if(this.authorizedUser.role=="DEVELOPER") {
          this.list3.push({id: data[i].orderId, text: data[i].title, status: data[i].status})
        } else if(this.authorizedUser.role=="ADMIN"){
          this.list2.push({id: data[i].orderId, text: data[i].title, status: data[i].status})
        }
      } else if(data[i].status == 'FINISHED') {
        if(this.authorizedUser.role=="DEVELOPER") {
          this.list4.push({id: data[i].orderId, text: data[i].title, status: data[i].status})
        } else if(this.authorizedUser.role=="ADMIN"){
          this.list3.push({id: data[i].orderId, text: data[i].title, status: data[i].status})
        }
      }
    }
    this.list1.sort((a, b) => a.id - b.id);
    this.list2.sort((a, b) => a.id - b.id);
    this.list3.sort((a, b) => a.id - b.id);
    this.list4.sort((a, b) => a.id - b.id);
  }

  list1Handler(output: SummaryForList, content?: any) {
    if(this.authorizedUser.role == "DEVELOPER") {
      if(output.status == "REJECT") {
        this.selectedList1 = output.id ? output.id : -1;
        this.orderService.getAdminCommentByOrderId(this.selectedList1).subscribe(data => {
          this.adminComment = data.adminComment;
        })
        this.openModalService.open(content, "md")
      }
    } else if(this.authorizedUser.role == "TESTER") {

    } else if(this.authorizedUser.role == "ADMIN") {
      if(output.status == "CONFIRMATION") {
        this.selectedList1 = output.id ? output.id : -1;
        this.checkOrder();
      }
    }
  }

  list2Handler(output: SummaryForList, content?: any) {
    if(this.authorizedUser.role == "DEVELOPER") {
      this.transferDataService.setSelectedSummary(output);
      this.router.navigate(["/approve-order-component"])
    } else if(this.authorizedUser.role == "TESTER") {

    } else if(this.authorizedUser.role == "ADMIN") {

    }
  }

  selectSummary(output: SummaryForList, content?: any) {
    if(output.status == "CONFIRMATION") {
      console.log(output.text + " ждёт одобрения!");
    }  else if(output.status == "APPROVED") {
      console.log(output.text + " это одобренный");
    } else if(output.status == "ACTIVE") {
      console.log(output.text + " это текущий");
    } else if(output.status == "FINISHED") {
      console.log(output.text + " это законченный");
    }
  }

  removeOrder(content:any) {
    this.orderService.removeOrderByOrderId(this.selectedList1).subscribe(data => {
      if(data) {
        for (let i = 0; i < this.list1.length; i++) {
          if(this.list1[i].id == this.selectedList1) {
            this.list1.splice(i, 1);
          }
        }
        alert("Заявка удалена!")
      } else {
        alert("Что-то пошло не так!")
      }
    })
    content.close();
  }

  checkOrder() {
    this.orderService.getOrderFullInfoByOrderId(this.selectedList1).subscribe(data => {
      this.transferDataService.setPrefillCreateOrder(data);
      this.router.navigate(["/create-order-component"]);
    })
  }

  async reopenOrder(content:any) {
    this.orderService.getOrderFullInfoByOrderId(this.selectedList1).subscribe(data => {
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

