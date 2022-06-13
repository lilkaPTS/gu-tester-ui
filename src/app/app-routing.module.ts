import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";
import {PersonalAccountComponent} from "./personal-account/personal-account.component";
import {CreateOrderComponent} from "./personal-account/create-order/create-order.component";
import {ApproveOrderComponent} from "./personal-account/approve-order/approve-order.component";

const routes: Routes = [
  {path: 'login-component', component: LoginComponent},
  {path: 'registration-component', component: RegistrationComponent},
  {path: 'personal-account-component', component: PersonalAccountComponent},
  {path: 'create-order-component', component: CreateOrderComponent},
  {path: 'approve-order-component', component: ApproveOrderComponent},
  {path: '', redirectTo: '/login-component', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
