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
  user: any;
  userFields: string[];

  constructor(
    private fb: FacebookService,
    private http: HttpClient
  ) {

    // i parametri iniziali richiesti dall'SDK di FB
    const initParams: InitParams = {
      appId: '444963099307703',
      xfbml: true,
      version: 'v2.11'
    };
    fb.init(initParams);
  }

  /**
   * Questa funzione è predisposta per non restituire valori
   */
  fbLogin(): void {
    // recupero lo status
    this.fb.getLoginStatus()
    .then((status: LoginStatus) => {
      // una volta recuperato lo status verifico se sono connesso
      this.currentState = status.status;
      if (status.status !== 'connected') {
        // non sono connesso, dunque apro il dialog per
        // la richiesta di permessi, o direttamente il recupero delle informazioni utente
        this.fb.login({
            scope: 'public_profile,email',
            return_scopes: true
          })
          .then(loginResponse => {
            this.currentState = loginResponse.status;
            if (loginResponse.status === 'connected') {
              // ora ho l'accessToken, posso recuperare info
              this.setInfos();
            }
            // non aggiungo l'else, l'utente ha chiuso il dialog
          });
      } else {
        // se sono connesso recupero le informazioni dell'utente
        this.setInfos();
      }

    }, err => {
      console.log('error', err);
    });
  }

  private setInfos(): void {
    this.fb.api('/me', 'get', {
      fields: [
        'first_name', 'last_name', 'email', 'gender', 'picture'
      ]
    }).then(obj => {
      this.user = obj;
      this.userFields = Object.keys(this.user);
    });
  }

}
