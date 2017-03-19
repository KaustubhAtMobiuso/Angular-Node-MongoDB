import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import { Base64 } from 'js-base64';

@Injectable()

export class NewUserService {
	apiKey:any;
	recipient:any;
	subject:any;
	message:any;
	private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
	private headers1 = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'});
  	private options = new RequestOptions({ headers: this.headers });
	private options1 = new RequestOptions({ headers: this.headers });

	constructor(private http: Http) { }

	postUserFormDetail(formValue) {
		console.log("Request come");
		console.log(formValue);
		return this.http.post('/user',
			{
				name: formValue.name,
				email: formValue.email,
				password: formValue.password,
				number: formValue.number
			}, this.options).map(res => res.json())
	    .catch(error => {
			return Observable.throw(error.json());
		});
	}

	getAllUser() {
		return this.http.get('/registeredUser').map(res => res.json());
	}

	updateUserProfile(userValue) {
		return this.http.put(`/updateProfile/${userValue._id}`, JSON.stringify(userValue), this.options).map(res => res.json());
	}

	deleteUserProfile(userDelete) {
		return this.http.delete(`/deleteProfile/${userDelete._id}`, this.options);
	}

	sendRegistrationMail(email) {
		console.log(email);
		this.http.get(`/sendMail/${email}`, this.options1).subscribe((data)=>{
			if(data.json().success)
				console.log("Mail sent");
		})
		/*this.apiKey = "api:key-0cc1063d11cf086abab167fdad203506";
		this.recipient ="kmkaustubh11@gmail.com";
		this.subject ="Registration Done";
		this.message ="Welcome Kaustubh to our site";
		
		let headers = new Headers(
			{
				"Content-Type": "application/x-www-form-urlencoded",
				"Authorization": "Basic " + Base64.encode(this.apiKey),
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
				"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
			}
		);
		console.log(headers);
		let options1 = new RequestOptions({ headers: headers });
		let body = "from=postmaster@sandbox190cb9c04e1843918328d600170cf61f.mailgun.org&to=" + this.recipient + "&subject=" + this.subject + "&text=" + this.message;

		this.http.post("https://api.mailgun.net/v3/sandbox190cb9c04e1843918328d600170cf61f.mailgun.org/messages", body, options1)
                .map(result => result.json())
                .subscribe(result => {
                    console.log("SENT!");
                    this.recipient = "";
                    this.subject = "";
                    this.message = "";
                }, error => {
                    console.log(error);
                });*/

	}
}