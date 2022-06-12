import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable, take} from "rxjs";
import {Constants} from "../../shared/Constants";
import {OrderDTO} from "./OrderDTO";

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

  private createRequest (dto: OrderDTO): any {
    return {
      "orderId": dto.orderId,
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
    };
  }

  createOrder (dto: OrderDTO): Observable<any> {
    return this.http.post<any>(`${Constants.baseUrl}/api/order/createOrder`, this.createRequest(dto), this.httpOptions);
  }

  reopenOrder (dto: OrderDTO): Observable<any> {
    return this.http.post<any>(`${Constants.baseUrl}/api/order/reopenOrder`, this.createRequest(dto), this.httpOptions);
  }



}
