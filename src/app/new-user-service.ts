import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class NewUserService {

	private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  	private options = new RequestOptions({ headers: this.headers });
	
	constructor(private http: Http) { }

	postUserFormDetail(formValue) {
		console.log("Request come");
		console.log(formValue);
		return this.http.post('/user', JSON.stringify(formValue), this.options);
	}

	checkUserAuthenication(loginValue) {
		console.log("Login Request Come");
		console.log(loginValue);
		let body = JSON.stringify({ email: loginValue.email, password: loginValue.password });
		return this.http.post('/userLogin', body, this.options);
	}

	getAllUser() {
		return this.http.get('/registeredUser').map(res => res.json());
	}

	updateUserProfile(userValue) {
		return this.http.put(`/updateProfile/${userValue._id}`, JSON.stringify(userValue), this.options);
	}

	deleteUserProfile(userDelete) {
		return this.http.delete(`/deleteProfile/${userDelete._id}`, this.options);
	}
}