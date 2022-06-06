import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { TesterPersonalAccountComponent } from './personal-accounts/tester-personal-account/tester-personal-account.component';
import { DeveloperPersonalAccountComponent } from './personal-accounts/developer-personal-account/developer-personal-account.component';
import { AdminPersonalAccountComponent } from './personal-accounts/admin-personal-account/admin-personal-account.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    TesterPersonalAccountComponent,
    DeveloperPersonalAccountComponent,
    AdminPersonalAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
