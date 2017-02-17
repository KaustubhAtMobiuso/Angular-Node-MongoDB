import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { NewUserService } from '../new-user-service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../auth.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
    error: string;
    userStatus: boolean;
  	constructor(
        private newUserService: NewUserService,
        private router: Router,
        private authService: AuthService
      ) {}

  	ngOnInit() {
      this.userStatus = this.authService.isLoggedIn();
      if(this.userStatus == false) {
        this.router.navigate(['/login']);
      } else {
        this.router.navigate(['/userDashboard']);
      }
  		
  	}

  	userAuthenicate(loginForm) {
  		console.log(loginForm.value);
      this.authService.signin(loginForm.value.email, loginForm.value.password).subscribe(
        res=>{
          console.log(res);
          if (res.success) {
            this.authService.saveState(res.user.name);
            this.router.navigate(['/userDashboard']);
          } else {
            this.error = res.msg;
          }
          })
  	}
}


