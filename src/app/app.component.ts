import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  islogged: boolean;
    constructor(private authService: AuthService, private router: Router) {
      this.authService.authenticateState$.subscribe( 
        state => this.islogged = state 
    );
  }

    ngOnInit() {
      this.islogged = this.authService.isLoggedIn();
    }

    logout() {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
}
