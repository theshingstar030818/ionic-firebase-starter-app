import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Injectable()
export class DetailsResolver implements Resolve<any> {

  constructor(public firebaseService: FirebaseService, ) { }

  resolve(route: ActivatedRouteSnapshot) {

    return new Promise((resolve, reject) => {
      const itemId = route.paramMap.get('id');
      this.firebaseService.getTask(itemId)
      .then(data => {
        data.id = itemId;
        resolve(data);
      }, err => {
        reject(err);
      });
    });
  }
}
