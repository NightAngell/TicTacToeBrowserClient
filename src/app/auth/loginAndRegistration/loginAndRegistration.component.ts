import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { HttpErrorResponse } from '@angular/common/http';
import { WaitingModalService } from 'src/app/shared/components/waiting-modal/waiting-modal.service';

@Component({
  selector: 'app-loginAndRegistration',
  templateUrl: './loginAndRegistration.component.html',
  styleUrls: ['./loginAndRegistration.component.css']
})
export class LoginAndRegistrationComponent implements OnInit {

  isLogin = true;
  secondSameUserExist = false;
  wrongLoginOrPassword = false;

  prevPage: string;
  constructor(
    private authService: AuthenticationService, 
    private route: ActivatedRoute,
    private router: Router,
    private waitingModal: WaitingModalService
  ) { }

  ngOnInit() {
    this.prevPage = this.route.snapshot.queryParamMap.get("returnUrl");
    if(isNullOrUndefined(this.prevPage)) this.prevPage = "";
    this.isLogin = this.route.snapshot.data["isLogin"] == "1";
  }

  onSubmit(form: NgForm){
    this.waitingModal.Show();

    if(this.isLogin){
      this.handleOnSubmitToLogin(form);
    } else {
      this.handleOnSubmitToRegistration(form);
    }
  }

  handleOnSubmitToLogin(form: NgForm){
    this.authService.login(form.value.email, form.value.password).subscribe(()=>{
      this.waitingModal.Hide();
      this.router.navigateByUrl(`${this.prevPage}`);
    }, 
    (errorResponse: HttpErrorResponse)=>{
      this.waitingModal.Hide();
      if(errorResponse.status === 401){
        this.wrongLoginOrPassword = true;
      }
    });
  }

  handleOnSubmitToRegistration(form: NgForm){
    this.authService.register(form.value.email, form.value.password).subscribe(()=>{
      this.waitingModal.Hide();
      this.router.navigateByUrl(`${this.prevPage}`);
    }, 
    (errorResponse: HttpErrorResponse)=>{
      this.waitingModal.Hide();
      const errors: [] = errorResponse.error as [];
      errors.forEach(error => {
        const code: string = error['code'];
        if(code === "DuplicateUserName") {
          this.secondSameUserExist = true;
        }
      });
    });
  }
}
