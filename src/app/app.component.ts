import { Component } from '@angular/core';
import { FacebookService, InitParams, LoginResponse } from 'ngx-facebook';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  currentState: string;

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
  }

  public fbLogin() {
    this.fb.login()
      .then((response: LoginResponse) => console.log('ok', response))
      .catch((error: any) => console.error('ko', error));
  }
}
