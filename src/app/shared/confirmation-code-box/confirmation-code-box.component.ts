import {Component, Input, OnInit} from '@angular/core';
import {RegistrationService} from "../../services/reglog/registration.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-confirmation-code-box',
  templateUrl: './confirmation-code-box.component.html',
  styleUrls: ['./confirmation-code-box.component.css']
})
export class ConfirmationCodeBoxComponent implements OnInit {

  @Input() email: string;
  @Input() modal: any;
  code: string = "";

  constructor(private registrationService: RegistrationService,
              private router: Router) { }

  ngOnInit(): void {
  }

  sendConfirmation(): void {
    this.registrationService.sendConfirmation(this.email).subscribe();
  }

  checkConfirmation(): void {
    this.registrationService.checkConfirmation(this.email, this.code).subscribe((data:boolean) => {
      if(data) {
        this.router.navigate(["/login-component"]);
        this.modal.close();
        alert("Пользователь успешно зарегистрирован");
      } else {
        alert("Неправильный код подтверждения")
      }
    });
  }
}
