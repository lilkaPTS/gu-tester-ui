import { Injectable } from '@angular/core';
import {Constants} from "../../shared/Constants";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TesterRegistrationDTO} from "../../registration/TesterRegistrationDTO";
import {RegistrationDTO} from "../../registration/RegistrationDTO";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type' : 'application/json'
        //'Authorization' : 'TOKEN ИЗ LOCALSTORAGE'
      }
    )
  }

  constructor(private http: HttpClient) { }

  regTester(dto: TesterRegistrationDTO): Observable<any> {
    let request = {
      "email": dto.email,
      "name": dto.name,
      "password": dto.password,
      "role": dto.role,
      "devices": dto.devices,
      "os": dto.os,
      "networks": dto.networks,
      "mobileOperators": dto.mobileOperators
    }
    return this.http.post<any>(`${Constants.baseUrl}/api/reg/createTester`, request, this.httpOptions);
  }

  regDeveloper(dto: RegistrationDTO): Observable<any> {
    let request = {
      "email": dto.email,
      "name": dto.name,
      "password": dto.password,
      "role": dto.role
    }
    return this.http.post<any>(`${Constants.baseUrl}/api/reg/createDeveloper`, JSON.stringify(request), this.httpOptions);
  }

  checkConfirmation(email: string, code: string): Observable<any> {
    let formData: FormData = new FormData();
    formData.append('email', email);
    formData.append('code', code);
    console.log(formData.get("email"))
    return this.http.put<any>(`${Constants.baseUrl}/api/reg/checkConfirmation`, formData);
  }

  sendConfirmation(email:string): Observable<any> {
    return this.http.post<any>(`${Constants.baseUrl}/api/reg/sendConfirmation`, email, this.httpOptions);
  }

}
