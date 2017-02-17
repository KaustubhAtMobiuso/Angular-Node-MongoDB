import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { ToasterModule, ToasterService} from 'angular2-toaster';

import { AppComponent } from './app.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { NewUserService } from './new-user-service';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AuthService } from './auth.service';
import { ResestPasswordComponent } from './resest-password/resest-password.component';


const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: UserLoginComponent
  },

  {
    path: 'userDashboard',
    component: UserDashboardComponent
  },

  {
    path: 'resestPassword',
    component: ResestPasswordComponent
  },
   
]

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserDashboardComponent,
    ResestPasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    ToasterModule
  ],
  providers: [NewUserService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
