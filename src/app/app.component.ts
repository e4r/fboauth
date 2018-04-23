import { Component } from '@angular/core';
import { FacebookService, InitParams, LoginResponse, LoginStatus } from 'ngx-facebook';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  currentState: string;
  accessToken: string;
  user: any;
  userFields: string[];

  constructor(
    private fb: FacebookService,
    private http: HttpClient
  ) {
    const initParams: InitParams = {
      appId: '444963099307703',
      xfbml: true,
      version: 'v2.11'
    };
    console.log(this.http);

    fb.init(initParams);
    console.log(this.fb);

    this.fb.getLoginStatus()
    .then((status: LoginStatus) => {
      console.log(status);
      this.fb.login(
        {
          scope: 'public_profile,email',
          return_scopes: true
        })
        .then(loginResponse => {
          console.log('loginREsponse', loginResponse);
        });
    }, err => {
      console.log('error', err);
    });
  }

  public fbLogin() {
    this.fb.login()
      .then((response: LoginResponse) => console.log('ok', response))
      .catch((error: any) => console.error('ko', error));
  }
}
