import { Injectable } from '@angular/core';
import {BehaviorSubject, delay, Observable, take} from "rxjs";
import {Role} from "../enums/Role";
import {HttpClient} from "@angular/common/http";
import {Constants} from "../shared/Constants";

@Injectable({
  providedIn: 'root'
})
export class SelectBoxService {

  constructor(private http: HttpClient) { }

  getAllDevice(): Observable<string[]> {
    return this.http.get<string[]>(`${Constants.baseUrl}/api/SelectInformation/getAllDeviceNames`);
  }

  getAllOs(): Observable<string[]> {
    return this.http.get<string[]>(`${Constants.baseUrl}/api/SelectInformation/getAllOSNames`);
  }

  getAllNetwork(): Observable<string[]> {
    return this.http.get<string[]>(`${Constants.baseUrl}/api/SelectInformation/getAllNetworkNames`);
  }

  getAllMobileOperator(): Observable<string[]> {
    return this.http.get<string[]>(`${Constants.baseUrl}/api/SelectInformation/getAllMobileOperatorNames`);
  }
}
