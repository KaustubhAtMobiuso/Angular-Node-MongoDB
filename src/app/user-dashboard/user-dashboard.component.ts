import { Component, OnInit } from '@angular/core';
import { NewUserService } from '../new-user-service';
import { ToasterModule, ToasterService} from 'angular2-toaster';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  toast:any;
  toastDelete:any;
	user= [];
  isEditing= false;
  userUpdate = {};
	constructor(private newUserService: NewUserService, private toasterService: ToasterService) {

	}

	ngOnInit() {
		this.getAllRegisteredUser();
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
      res => {
        this.isEditing = false;
        this.userUpdate = userValue;
        this.popToast();
      },
      error => console.log(error)
    );
    }

    popToast() {
      this.toast = {
        body: 'User Profile Updated Successfully.',
        showCloseButton: true,
        tapToDismiss: false, 
    };
      this.toasterService.pop(this.toast);
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
