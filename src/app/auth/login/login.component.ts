import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {AuthService} from '../shared/auth.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logInForm: FormGroup;
  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private router: Router) {

    this.logInForm = fb.group({
      email: '',
      password: ''
    });
  }

  ngOnInit() {
        this.authService.isAuthenticated()
          .subscribe(authState => console.log(authState),
            error2 => console.log(error2),
            () => console.log('complete'));
      }
      login() {
        const loginModel = this.logInForm.value;
        console.log('login clicked');
        this.authService.login(loginModel.email, loginModel.password)
          .then(() => {
            this.router.navigateByUrl('albums')
              .then(() => this.snackBar.open('Your logged in', '', {
                duration: 5000 }));

          })
          .catch(error => {
            this.snackBar.open(error.message, '', {
              duration: 5000 });
          });

      }
}
