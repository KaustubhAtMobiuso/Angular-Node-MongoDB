import { Component, OnInit } from '@angular/core';
import { NewUserService } from '../new-user-service';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {ConfirmOptions, Position} from 'angular2-bootstrap-confirm';
import {Positioning} from 'angular2-bootstrap-confirm/position';




declare var $: any;

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
  providers: [ // you can pass both of these when bootstrapping the app to configure globally throughout your app
    ConfirmOptions,
     // this is required so you can use the bundled position service rather than rely on the `@ng-bootstrap/ng-bootstrap` module
    {provide: Position, useClass: Positioning}
  ]
})
export class UserDashboardComponent implements OnInit {
  public isOpen: boolean = false;
	user= [];
  isEditing= false;
  userUpdate = {};
  userStatus:boolean;
  loggedInUser: any;
  successMessage: string;
	constructor(
    private newUserService: NewUserService,
    private authService: AuthService,
    private router: Router
  ) { 
  
  }

    ngOnInit() {
		  this.getAllRegisteredUser();
      this.userStatus = this.authService.isLoggedIn();
      if(this.userStatus == false) {
        this.router.navigate(['/login']);
      } else {
        this.router.navigate(['/userDashboard']);
      }
      this.loggedInUser = localStorage.getItem('user');
      console.log(this.loggedInUser);
  	}

  	getAllRegisteredUser() {
  		this.newUserService.getAllUser().subscribe(
  			data => this.user = data, 
      		error => console.log(error)
    	);	
  	}

    enableEditing(userUpdate) {
      this.isEditing = true;
      this.userUpdate = userUpdate;
      console.log(userUpdate);
    }

    cancelEditing() {
      this.isEditing = false;
      this.userUpdate = {};
      this.getAllRegisteredUser();
    }

    updateUserProfile(userValue) {
      console.log(userValue);
      this.newUserService.updateUserProfile(userValue).subscribe(
      res=>{
          if(res.success) {
            this.successMessage= res.msg;
            location.reload();
          }
        })
    }

    postUserForm(userForm) {
      console.log(userForm.value);
      this.newUserService.postUserFormDetail(userForm.value).subscribe(
        res=>{
          if(res.success) {
            this.successMessage= res.msg;
            this.newUserService.sendRegistrationMail();
          }
        })
    }

    confirmClicked(value) {
      console.log(value);
        this.newUserService.deleteUserProfile(value).subscribe(
        res => {
          let pos = this.user.map(elem => { return elem._id; }).indexOf(value._id);
          this.user.splice(pos, 1);
        },
        error => console.log(error)
      );
  }
}
