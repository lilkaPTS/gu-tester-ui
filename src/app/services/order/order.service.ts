import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Constants} from "../../shared/Constants";
import {OrderLowInfoDTO} from "./OrderLowInfoDTO";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getAllOrderLowInfoByDeveloperEmail(developerEmail: string): Observable<OrderLowInfoDTO[]> {
    return this.http.get<OrderLowInfoDTO[]>(`${Constants.baseUrl}/api/personal/account/getAllOrderLowInfoByDeveloperEmail?developerEmail=`+developerEmail);
  }

  getAdminCommentByOrderId(orderId: number): Observable<string> {
    return this.http.get<string>(`${Constants.baseUrl}/api/personal/account/getAdminCommentByOrderId?orderId=`+orderId);

  }

}
