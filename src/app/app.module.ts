import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HeaderComponent } from './shared/header/header.component';
import { PersonalAccountComponent } from './personal-account/personal-account.component';
import { ListSummaryComponent } from './personal-account/list-summary/list-summary.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import { ConfirmationCodeBoxComponent } from './shared/confirmation-code-box/confirmation-code-box.component';
import { NotificationBoxComponent } from './shared/notification-box/notification-box.component';
import { CreateOrderComponent } from './personal-account/create-order/create-order.component';
import {SelectBoxComponent} from "./shared/select-box/select-box.component";
import { ApproveOrderComponent } from './personal-account/approve-order/approve-order.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HeaderComponent,
    PersonalAccountComponent,
    ListSummaryComponent,
    SelectBoxComponent,
    ConfirmationCodeBoxComponent,
    NotificationBoxComponent,
    CreateOrderComponent,
    ApproveOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
