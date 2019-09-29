import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as app from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FirebaseMessagingService {

  private messaging;
  private unsubscribeOnTokenRefresh = () => {};

  constructor(
    private storage: Storage,
  ) {
    this.messaging = app.messaging();
    navigator.serviceWorker.register('firebase-messaging-sw.js').then((registration) => {
      this.messaging.useServiceWorker(registration);
      // this.disableNotifications()
      this.enableNotifications();
    });
  }

  public enableNotifications() {
    console.log('Requesting permission...');
    return this.messaging.requestPermission().then(() => {
        console.log('Permission granted');
        // token might change - we need to listen for changes to it and update it
        this.setupOnTokenRefresh();
        return this.updateToken();
      });
  }

  public disableNotifications() {
    this.unsubscribeOnTokenRefresh();
    this.unsubscribeOnTokenRefresh = () => {};
    return this.storage.set('fcmToken', '').then();
  }

  private updateToken() {
    return this.messaging.getToken().then((currentToken) => {
      if (currentToken) {
        // we've got the token from Firebase, now let's store it in the database
        console.log(currentToken);
        return this.storage.set('fcmToken', currentToken);
      } else {
        console.log('No Instance ID token available. Request permission to generate one.');
      }
    });
  }

  private setupOnTokenRefresh(): void {
    this.unsubscribeOnTokenRefresh = this.messaging.onTokenRefresh(() => {
      console.log('Token refreshed');
      this.storage.set('fcmToken', '').then(() => { this.updateToken(); });
    });
  }
}
