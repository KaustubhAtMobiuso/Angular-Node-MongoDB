import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-resest-password',
  templateUrl: './resest-password.component.html',
  styleUrls: ['./resest-password.component.css']
})
export class ResestPasswordComponent implements OnInit {
	

	constructor(private fb: FormBuilder) { }

	ngOnInit() {
	
	}

}
