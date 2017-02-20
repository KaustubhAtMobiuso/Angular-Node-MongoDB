import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {Subject} from "rxjs/Subject";

@Injectable()
export class AuthService {

	private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  	private options = new RequestOptions({ headers: this.headers });
  	auth: boolean;
  	private authenticate = new Subject<boolean>();
  	authenticateState$ = this.authenticate.asObservable();

	constructor(private http: Http) { }

	signin(email, password) {
		console.log("Login Request Come");
		return this.http.post('/api/login',{
			email: email,
			password: password
		},this.options)
		.map(res => res.json())
	    .catch(error => {
			return Observable.throw(error.json());
		});
	}

	saveState(user) {
		localStorage.setItem('user', user);
		this.authenticate.next(true);
	}

	logout() {
		localStorage.removeItem('user');
		this.authenticate.next(false);
	}

	isLoggedIn() {
		if(localStorage.getItem('user')) {
			this.auth = true;
		} else {
			this.auth = false;
		}
		return this.auth;
	}

	emailCheck(email) {
		return this.http.post('/reset', email).map(res => res.json());
	}

	updatePassword(userPassword) {
		return this.http.put('/updatePassword', JSON.stringify(userPassword), this.options).map(res => res.json());
	}
}
