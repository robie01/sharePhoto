import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {User} from './User';
import {AuthService} from '../../auth/shared/auth.service';
import {AngularFirestore} from 'angularfire2/firestore';
import 'rxjs/add/operator/first';
import {EmptyObservable} from 'rxjs/observable/EmptyObservable';

@Injectable()
export class UserService {

  constructor(private authService: AuthService,
              private afs: AngularFirestore) { }

  getUserInfo(): Observable<User> {
    // Get the AuthUser
    // Get the DBUser - SwitchMap ()
    // Merge both - Map
    return this.authService.getAuthUser() // this means to call once and then will shut down the connection.
      .switchMap(authUser => {
        if (!authUser) {
          return new EmptyObservable();
        }
        return this.afs.doc<User>('users/' + authUser.uid).valueChanges()
          .map(dbUser => {
            if (dbUser) {
              authUser.username = dbUser.username;
              authUser.firstname = dbUser.firstname;
              authUser.lastname = dbUser.lastname;
            }
            return authUser;
          });
      });
  }
  // update the user to firebase
  update(user: User): Promise<any> {
    return this.afs.doc('users/' + user.uid).set(user);
  }
}
