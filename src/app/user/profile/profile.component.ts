import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../auth/shared/auth.service';
import {User} from '../shared/User';
import {UserService} from '../shared/user.service';
import {Subscription} from 'rxjs/Subscription';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatSnackBar} from '@angular/material';
import {FileService} from '../../file-system/file.service';


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
  srcLoaded: boolean;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private fileService: FileService,
              private snack: MatSnackBar) {

    this.profileForm = fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      firstName: '',
      lastName: '',
    });
  }

  ngOnInit() {
    // this already checked the authentication of user.
    this.userSub = this.userService.getUserProfileUrl()
      .subscribe(user => {
        this.user = user;
        this.img = user.profileImgUrl;
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

  uploadNewImage(fileList) {
    if
    (fileList && fileList.length === 1 &&
    ['image/jpeg', 'image/png'].indexOf(fileList.item(0).type) > -1) {
      this.srcLoaded = false;
      console.log(fileList.item(0));
      const file = fileList.item(0);
      const path = 'profile-image/' + this.user.uid;
      this.fileService.upload(path, file).downloadUrl.subscribe(
        url => {
          console.log('url', url);
          this.img = url;
          this.hovering(false);
        }
      );
    } else {
      console.log('wrong: ');
      this.snack.open('You need to drop jpeg or png image!', null, {
        duration: 4000
      });
    }
   this.hovering(false);
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
