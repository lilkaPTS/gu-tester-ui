import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, take} from "rxjs";
import {AuthorizedUser} from "../reglog/AuthorizedUser";

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  authorizedUser: BehaviorSubject<AuthorizedUser> = new BehaviorSubject<AuthorizedUser>(new AuthorizedUser());

  authorizedUser$: Observable<AuthorizedUser> = this.authorizedUser.asObservable()

  constructor() { }

  setAuthorizedUser(authorizedUser: AuthorizedUser): void {
    this.authorizedUser$.pipe(take(1)).subscribe(value => {
      this.authorizedUser.next(authorizedUser)
    });
  }



}
