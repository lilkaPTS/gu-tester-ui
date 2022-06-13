import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, take} from "rxjs";
import {AuthorizedUser} from "../reglog/AuthorizedUser";
import {SummaryForList} from "../../personal-account/list-summary/SummaryForList";

@Injectable({
  providedIn: 'root'
})
export class TransferDataService {

  prefillCreateOrder: BehaviorSubject<any> = new BehaviorSubject<any>("");
  prefillCreateOrder$: Observable<any> = this.prefillCreateOrder.asObservable()

  selectedSummary: BehaviorSubject<SummaryForList> = new BehaviorSubject<any>("")
  selectedSummary$: Observable<SummaryForList> = this.selectedSummary.asObservable();

  constructor() { }

  setPrefillCreateOrder(prefillData: any): void {
    this.prefillCreateOrder$.pipe(take(1)).subscribe(value => {
      this.prefillCreateOrder.next(prefillData)
    });
  }

  setSelectedSummary(selectedSummary: SummaryForList): void {
    this.selectedSummary$.pipe(take(1)).subscribe(value => {
      this.selectedSummary.next(selectedSummary)
    });
  }

}
