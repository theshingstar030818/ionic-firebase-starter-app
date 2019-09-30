import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

import { FirebaseMessagingService } from '../services/firebase-messaging.service';
import { FirebaseService } from '../services/firebase.service';
import { AuthService } from '../services/auth.service';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Device } from '@ionic-native/device/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-device-info',
  templateUrl: './device-info.page.html',
  styleUrls: ['./device-info.page.scss'],
})
export class DeviceInfoPage implements OnInit {

  deviceInfo: any = {};
  currentUser: any;

  constructor(
    private firebaseMessagingService: FirebaseMessagingService,
    private device: Device,
    private authService: AuthService,
    private router: Router,
    private firebaseService: FirebaseService,
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    private platform: Platform,
  ) {
    this.getDeviceInfo();
    this.currentUser = this.firebaseService.getCurrentUser();
    this.getAllPeople();
  }

  ngOnInit() {
  }

  async getAllPeople() {
    this.afAuth.user.subscribe(currentUser => {
      if (currentUser) {
        this.afs.collection('people').doc(currentUser.uid).collection('tasks').snapshotChanges().subscribe((data) => {
          // console.log(data);
        });
      }
    });
  }

  getDeviceInfo() {
    console.log(this.device);
    this.deviceInfo.cordova = this.device.cordova;
    this.deviceInfo.isVirtual = this.device.isVirtual;
    this.deviceInfo.manufacturer = this.device.manufacturer;
    this.deviceInfo.model = this.device.model;
    this.deviceInfo.platform = this.device.platform;
    this.deviceInfo.serial = this.device.serial;
    this.deviceInfo.uuid = this.device.uuid;
    this.deviceInfo.version = this.device.version;
  }

  logout() {
    this.authService.doLogout()
    .then(res => {
      this.router.navigate(['/login']);
    }, err => {
      console.log(err);
    });
  }

}
