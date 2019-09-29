import { Component, OnInit } from '@angular/core';

import { FirebaseMessagingService } from '../firebase-messaging.service';
import { Device } from '@ionic-native/device/ngx';

import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-device-info',
  templateUrl: './device-info.page.html',
  styleUrls: ['./device-info.page.scss'],
})
export class DeviceInfoPage implements OnInit {

  deviceInfo: any = {};

  constructor(
    private firebaseMessagingService: FirebaseMessagingService,
    private device: Device,
    private authService: AuthService,
    private router: Router,
  ) {
    this.getDeviceInfo();
  }

  ngOnInit() {
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
