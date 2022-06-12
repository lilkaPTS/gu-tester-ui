import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, take} from "rxjs";
import {AuthorizedUser} from "../reglog/AuthorizedUser";

@Injectable({
  providedIn: 'root'
})
export class TransferDataService {

  prefillCreateOrder: BehaviorSubject<any> = new BehaviorSubject<any>("");
  prefillCreateOrder$: Observable<any> = this.prefillCreateOrder.asObservable()

  constructor() { }

  setPrefillCreateOrder(prefillData: any): void {
    this.prefillCreateOrder$.pipe(take(1)).subscribe(value => {
      this.prefillCreateOrder.next(prefillData)
    });
  }
}
