import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Constants} from "../../shared/Constants";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  approveOrder(orderId: number): Observable<any> {
    return this.http.put<any>(`${Constants.baseUrl}/api/admin/approveOrder`, orderId);
  }

  rejectOrder(orderId: number, adminComment:string): Observable<any> {
    let formData: FormData = new FormData();
    formData.append("orderId", orderId.toString());
    formData.append("adminComment", adminComment);
    return this.http.put<any>(`${Constants.baseUrl}/api/admin/rejectOrder`, formData);
  }
}
