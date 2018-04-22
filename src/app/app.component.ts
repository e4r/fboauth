import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public fbLogin() {
    // this.router.navigate(['./home']);
    FB.getLoginStatus((response) => {
        if (response.status === 'connected') {
          console.log('connected');
        } else {
            FB.login((loginResponse) => {
              console.log('loginResponse', loginResponse);
            });
        }
    });
}
}
