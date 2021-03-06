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

  getAllOrderLowInfo(): Observable<OrderLowInfoDTO[]> {
    return this.http.get<OrderLowInfoDTO[]>(`${Constants.baseUrl}/api/personal/account/getAllOrderLowInfo`);
  }

  getOrderFullInfoByOrderId(orderId: number): Observable<any> {
    return this.http.get<any>(`${Constants.baseUrl}/api/personal/account/getOrderFullInfoByOrderId?orderId=`+orderId);
  }

  getAdminCommentByOrderId(orderId: number): Observable<any> {
    return this.http.get<any>(`${Constants.baseUrl}/api/personal/account/getAdminCommentByOrderId?orderId=`+orderId);
  }

  removeOrderByOrderId(orderId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${Constants.baseUrl}/api/personal/account/removeOrderByOrderId?orderId=`+orderId);
  }

  getUnapprovedTestersByOrderId(orderId: number):Observable<any> {
    return this.http.get<any>(`${Constants.baseUrl}/api/personal/account/getUnapprovedTestersByOrderId?orderId=`+orderId);
  }
}
