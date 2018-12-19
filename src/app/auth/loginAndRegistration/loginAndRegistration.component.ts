import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { HttpErrorResponse } from '@angular/common/http';

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
    private router: Router
  ) { }

  ngOnInit() {
    this.prevPage = this.route.snapshot.queryParamMap.get("returnUrl");
    if(isNullOrUndefined(this.prevPage)) this.prevPage = "";
    this.isLogin = this.route.snapshot.data["isLogin"] == "1";
  }

  onSubmit(form: NgForm){
    if(this.isLogin){
      this.authService.login(form.value.email, form.value.password).subscribe(()=>{
        this.router.navigateByUrl(`${this.prevPage}`);
      }, (errorResponse: HttpErrorResponse)=>{
        if(errorResponse.status === 401){
          this.wrongLoginOrPassword = true;
        }
      });
    } else {
      this.authService.register(form.value.email, form.value.password).subscribe(()=>{
        this.router.navigateByUrl(`${this.prevPage}`);
      }, (errorResponse: HttpErrorResponse)=>{
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

}
