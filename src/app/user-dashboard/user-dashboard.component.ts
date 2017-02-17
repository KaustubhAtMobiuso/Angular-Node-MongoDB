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
  
  toastDelete:any;
	user= [];
  isEditing= false;
  userUpdate = {};
  userStatus:boolean;
  loggedInUser: any;
  successMessage: string;
	constructor(
    private newUserService: NewUserService,
    private toasterService: ToasterService,
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

    deleteUser(value) {
      console.log(value);
      if (window.confirm('Are you sure want to permanently delete this item ?')) {
        this.newUserService.deleteUserProfile(value).subscribe(
        res => {
          let pos = this.user.map(elem => { return elem._id; }).indexOf(value._id);
          this.user.splice(pos, 1);
          this.deleteUserPopToast();
        },
        error => console.log(error)
      );
    }
  }

    deleteUserPopToast() {
      this.toastDelete = {
        body: 'User Deleted Successfully.',
        showCloseButton: true,
        tapToDismiss: false, 
    };
      this.toasterService.pop(this.toastDelete);
    }

}
