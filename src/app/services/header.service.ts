import { Injectable } from '@angular/core';
import { Role } from "../enums/Role";
import {BehaviorSubject, Observable, take} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  role: BehaviorSubject<Role> = new BehaviorSubject<Role>(0);

  role$: Observable<Role> = this.role.asObservable()

  constructor() { }

  setRole(role: Role): void {
    this.role$.pipe(take(1)).subscribe(value => {
      this.role.next(role)
    })
  }
}
