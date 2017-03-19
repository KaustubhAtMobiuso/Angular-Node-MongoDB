import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {NgForm} from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-resest-password',
  templateUrl: './resest-password.component.html',
  styleUrls: ['./resest-password.component.css']
})
export class ResestPasswordComponent implements OnInit {
	emailFound: boolean;
	successMessage: any;
	failureMessage: any;

	constructor(private fb: FormBuilder, private authService: AuthService,) { }

	ngOnInit() {
		
	}

	resetPassword(value) {
		if (this.emailFound) {
			this.changePassword(value);
		} else {
			this.authService.emailCheck(value).subscribe(
	  			res=>{
	          		if(res.success) {
	          			this.emailFound = true;
	          			this.successMessage =  res.msg;
	          			this.failureMessage = false;
	          } else {
	          	this.failureMessage =  res.msg;
	          }
	        });
		}
	}

	changePassword(value) {
		console.log(value);
		this.authService.updatePassword(value).subscribe(
	  			res=>{
	          		if(res.success) {
	          			this.successMessage =  res.msg;
	          			this.failureMessage = false;
	          } else {
	          	this.failureMessage =  res.msg;
	          }
	        })

	}

}
