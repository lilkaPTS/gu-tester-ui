import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Constants} from "../../shared/Constants";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type' : 'application/json'
        //'Authorization' : 'TOKEN ИЗ LOCALSTORAGE'
      }
    )
  }

  constructor(private http: HttpClient) { }

  authenticate(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${Constants.baseUrl}/api/auth/login`, {email, password}, this.httpOptions);
  }
}
