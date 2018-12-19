import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
  isAuthenticated: boolean;

  constructor(private auth: AuthenticationService){}

  ngOnInit(): void {
    this.isAuthenticated = this.auth.isUserAuthenticated()
    this.auth.userLogged.subscribe(()=>{
      this.isAuthenticated = true;
    });
  }

  onLogout(){
    this.auth.logout();
  }
}
