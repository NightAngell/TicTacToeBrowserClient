import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.authService.login("sobta24@wp.pl", "qwerty123").subscribe();
  }

}
