import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TesterRegistrationDTO} from "../../registration/TesterRegistrationDTO";
import {BehaviorSubject, Observable, take} from "rxjs";
import {Constants} from "../../shared/Constants";
import {OrderDTO} from "./OrderDTO";
import {AuthorizedUser} from "../reglog/AuthorizedUser";

@Injectable({
  providedIn: 'root'
})
export class ProcessOrderService {

  os: BehaviorSubject<string> = new BehaviorSubject<string>('');
  os$: Observable<string> = this.os.asObservable()

  httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type' : 'application/json'
        //'Authorization' : 'TOKEN ИЗ LOCALSTORAGE'
      }
    )
  }

  setOS(os: string): void {
    this.os$.pipe(take(1)).subscribe(value => {
      this.os.next(os)
    });
  }

  constructor(private http: HttpClient) { }

  createOrder (dto: OrderDTO): Observable<any> {
    let request = {
      "developerEmail": dto.developerEmail,
      "osName": this.os.getValue(),
      "sourceLink": dto.sourceLink,
      "title": dto.orderTitle,
      "description": dto.orderDescription,
      "requiredNumberOfTesters": dto.requiredNumberOfTesters,
      "deviceReleaseYearStart": dto.deviceReleaseYearStart,
      "deviceReleaseYearEnd": dto.deviceReleaseYearEnd,
      "contactEmail": dto.contactEmail,
      "osList": dto.osList,
      "devices": dto.devices,
      "deviceManufacturers": dto.deviceManufacturers,
      "mobileOperators": dto.mobileOperators,
      "networks": dto.networks
    }
    return this.http.post<any>(`${Constants.baseUrl}/api/order/createOrder`, request, this.httpOptions);
  }

}
