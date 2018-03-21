import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../auth/shared/auth.service';
import {User} from '../shared/User';
import {UserService} from '../shared/user.service';
import {Subscription} from 'rxjs/Subscription';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [trigger('imageHover', [
    state('hoveringImage', style({
      opacity: 0.3
    })),
    state('notHoveringImage', style({
      opacity: 1
    })),
    transition('hoveringImage => notHoveringImage', animate('200ms ease-in'))
  ])]
})
export class ProfileComponent implements OnInit, OnDestroy {
  profileForm: FormGroup;
  user: User; // user local and not from firebase
  userSub: Subscription;
  isHovering: boolean;

  constructor(private fb: FormBuilder,
              private userService: UserService) {

    this.profileForm = fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      firstName: '',
      lastName: '',
    });
  }

  ngOnInit() {
    // this already checked the authentication of user.
    this.userSub = this.userService.getUser()
      .subscribe(user => {
        this.user = user;
        this.profileForm.patchValue(user);
        console.log(user);
      });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
  hovering(isHovering: boolean) {
    this.isHovering = isHovering;
  }

  save() {
    const model = this.profileForm.value as User;
    model.uid = this.user.uid;
    this.userService.update(model)
      .then( () => console.log('saved'))
      .catch(err => console.log('error' + err));
  }

  unchanged(): boolean {
    const model = this.profileForm.value as User;
    return model.username === this.user.username &&
      model.firstname === this.user.firstname &&
      model.lastname === this.user.lastname;
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
