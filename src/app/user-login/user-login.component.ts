import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { NewUserService } from '../new-user-service';
import { ToasterModule, ToasterService} from 'angular2-toaster';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  toast:any;
  toast1:any;
	loginForm: FormGroup;
  	constructor(
        private fb: FormBuilder,
        private newUserService: NewUserService,
        private toasterService: ToasterService,
        private router: Router
      ) {
          this.toasterService = toasterService;
    }

  	ngOnInit() {
  		this.loginForm = this.fb.group({
  			email: new FormControl('', Validators.required),
  			password: new FormControl('', Validators.required) 
  		});
  	
  	}

  	userAuthenicate() {
  		console.log(this.loginForm.value);
      this.newUserService.checkUserAuthenication(this.loginForm.value).subscribe(
        res=>{
          let formValue = res.json();
          console.log(formValue);
          this.popToast();
        }, 
        error=> {
          console.log(error);
          this.popToastFailed();
        }
        );
  	}

    popToast() {
      this.toast = {
        body: 'Login Successfully.',
        showCloseButton: true,
        tapToDismiss: false, 
    };
      this.toasterService.pop(this.toast);
      this.router.navigate(['/userDashboard']);
    }

    popToastFailed() {
      this.toast1 = {
        body: 'Login Failed.',
        showCloseButton: true,
        tapToDismiss: false, 
    };
      this.toasterService.pop(this.toast1);
    }
    }


