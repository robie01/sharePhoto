import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {User} from './User';
import {AuthService} from '../../auth/shared/auth.service';
import {AngularFirestore} from 'angularfire2/firestore';

@Injectable()
export class UserService {

  constructor(private authService: AuthService,
              private afs: AngularFirestore) { }

  getUser(): Observable<User> {
    return this.authService.getAuthUser();
  }
  // update the user to firebase
  update(user: User): Promise<any> {
    return this.afs.doc('users/' + user.uid).set(user);
  }
}
