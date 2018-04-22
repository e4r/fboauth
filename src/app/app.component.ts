import { Component } from '@angular/core';
import { FacebookService, InitParams, LoginResponse } from 'ngx-facebook';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private fb: FacebookService
  ) {
    const initParams: InitParams = {
      appId: '444963099307703',
      xfbml: true,
      version: 'v2.11'
    };

    fb.init(initParams);
  }

  public fbLogin() {
    this.fb.login()
      .then((response: LoginResponse) => console.log('ok', response))
      .catch((error: any) => console.error('ko', error));
  }
}
