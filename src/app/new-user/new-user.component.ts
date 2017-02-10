import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { NewUserService } from '../new-user-service';
import { Http } from '@angular/http';
import { ToasterModule, ToasterService} from 'angular2-toaster';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

	 userForm: FormGroup;
   toast:any;
  	constructor(
        private fb : FormBuilder,
        private newUserService: NewUserService,
        private toasterService: ToasterService,
        private router: Router
    ) { 
 	    this.toasterService = toasterService;
    }

  	ngOnInit() {
  		this.userForm = this.fb.group({
  			name: new FormControl('', Validators.required),
  			email: new FormControl('', Validators.required),
  			password: new FormControl('', Validators.required),
  			number: new FormControl('', Validators.required) 
  		});
  	}

  	postUserForm() {
  		console.log(this.userForm.value);
  		this.newUserService.postUserFormDetail(this.userForm.value).subscribe(
  			res=>{
  				let formValue = res.json();
          this.popToast();
  				console.log(formValue);
  			}, 
        error=> console.log(error)
        );
    }

    popToast() {
      this.toast = {
        body: 'Registration done Successfully.',
        showCloseButton: true,
        tapToDismiss: false, 
        timeout: 0
    };
    this.toasterService.pop(this.toast);
    this.router.navigate(['/login']);
  }
} 