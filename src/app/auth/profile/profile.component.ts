import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../shared/auth.service';
import {User} from '../../user/shared/User';
import {UserService} from '../../user/shared/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  user: User; // user local and not from firebase
  constructor(private fb: FormBuilder,
              private userService: UserService) {

    this.profileForm = fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      firstname: '',
      lastname: '',
    });
  }

  ngOnInit() {
    this.userService.getUser()
      .subscribe(user => this.user = user);
  }
  save() {
  }
  fcError(fc: string, error: string, pre?: string[]): boolean {

    if (pre && pre.length > 0) {
      for (let i = 0; i < pre.length; i++) {
        if (this.profileForm.get(fc).hasError(pre[i])) {
          return false;
        }
      }
    }
    return this.profileForm.get(fc).hasError(error);
  }

}
