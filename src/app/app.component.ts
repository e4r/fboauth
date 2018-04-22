import { Component } from '@angular/core';
import { FacebookService, InitParams, LoginResponse, LoginStatus } from 'ngx-facebook';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  currentState: string;
  accessToken: string;

  constructor(
    private fb: FacebookService
  ) {
    const initParams: InitParams = {
      appId: '444963099307703',
      xfbml: true,
      version: 'v2.11'
    };

    fb.init(initParams);
    console.log(this.fb);
    this.fb.getLoginStatus()
    .then((status: LoginStatus) => {
      this.currentState = status.status;
      this.accessToken = status.authResponse.accessToken;
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
