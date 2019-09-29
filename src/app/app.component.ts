import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import '@firebase/messaging';

import { Router } from '@angular/router';

import { Firebase } from '@ionic-native/firebase/ngx';
import { FirebaseMessagingService } from './firebase-messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    public afAuth: AngularFireAuth,
    private firebaseCordova: Firebase,
    private firebaseMessagingService: FirebaseMessagingService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.afAuth.user.subscribe(user => {
        if (user) {
          this.router.navigate(['/home']);
        } else {
          this.router.navigate(['/login']);
        }
      }, err => {
        this.router.navigate(['/login']);
      }, () => {
        this.splashScreen.hide();
      });

      this.firebaseCordova.getToken()
        .then(token => console.log(`The token is ${token}`)) // save the token server-side and use it to push notifications to this device
        .catch(error => console.error('Error getting token', error));

      this.firebaseCordova.onNotificationOpen()
        .subscribe(data => console.log(`User opened a notification ${data}`));

      this.firebaseCordova.onTokenRefresh().subscribe((token: string) => console.log(`Got a new token ${token}`));

      this.statusBar.styleDefault();
    });
  }
}
