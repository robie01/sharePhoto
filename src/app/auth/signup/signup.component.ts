import { Component, OnInit } from '@angular/core';
import {AuthService} from '../shared/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {matchPassword} from '../shared/password.validator';
import {User} from '../shared/User';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private router: Router) {

    this.signupForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', [Validators.required, matchPassword()]]
    });
  }

  ngOnInit() {
    this.authService.isAuthenticated()
      .subscribe(authState => console.log(authState),
        error2 => console.log(error2),
        () => console.log('complete'));
  }
  signup() {
    const signUpModel = this.signupForm.value as User
    console.log('login clicked');
    this.authService.signup(signUpModel)
      .then(() => {
        this.router.navigateByUrl('albums')
          .then(() => this.snackBar.open('You signed up', '', {
            duration: 3000 }));

      })
      .catch(error => {
        this.snackBar.open(error.message, '', {
          duration: 5000 });
      });

  }

  fcError(fc: string, error: string, pre?: string[]): boolean {

    if (pre && pre.length > 0) {
      for (let i = 0; i < pre.length; i++) {
        if (this.signupForm.get(fc).hasError(pre[i])) {
          return false;
        }
      }
    }
    return this.signupForm.get(fc).hasError(error);
  }

}
