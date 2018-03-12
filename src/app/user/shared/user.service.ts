import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {User} from './User';
import {AuthService} from '../../auth/shared/auth.service';

@Injectable()
export class UserService {

  constructor(private authService: AuthService) { }

  getUser(): Observable<User> {
    return this.authService.getAuthUser();
  }
}
