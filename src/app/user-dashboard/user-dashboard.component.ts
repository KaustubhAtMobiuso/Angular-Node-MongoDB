import { Component, OnInit } from '@angular/core';
import { NewUserService } from '../new-user-service';
import { ToasterModule, ToasterService} from 'angular2-toaster';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

	user= [];
  isEditing= false;
  userUpdate = {};
  userStatus:boolean;
  loggedInUser: any;
  successMessage: string;
  birthday: any;
	constructor(
    private newUserService: NewUserService,
    private toasterService: ToasterService,
    private authService: AuthService,
    private router: Router
  ) { 
    this.birthday = new Date();
    console.log(this.birthday);
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
            window.alert(this.successMessage);
            //location.reload();
            console.log(res.userModel.email);
            this.newUserService.sendRegistrationMail(res.userModel.email);
          }
        })
    }

    deleteUser(value) {
      console.log(value);
      if (window.confirm('Are you sure want to permanently delete this item ?')) {
        this.newUserService.deleteUserProfile(value).subscribe(
        res => {
          let pos = this.user.map(elem => { return elem._id; }).indexOf(value._id);
          this.user.splice(pos, 1);
        },
        error => console.log(error)
      );
    }
  }
}
