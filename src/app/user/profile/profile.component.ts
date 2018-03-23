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
  img: string;

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

  changePic(event) {

    if (event.toState === 'hoveringImage') {
      this.img = '../../../../assets/Images/ic_cloud_upload_black_24px.svg';
    } else {
      this.img = 'https://firebasestorage.googleapis.com/v0/b/familysharingapp-7a1c0.appspot.com/o/pic_1.png?alt=media&token=b33cd420-0c93-4fbd-bfba-df11f69e8132';
    }
    console.log('animation done', event);
  }

  uploadNewImage(fileList) {
    console.log('hi: ', fileList);
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
