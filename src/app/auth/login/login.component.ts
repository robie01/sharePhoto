import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {AuthService} from '../shared/auth.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logInForm: FormGroup;
  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private snackBar: MatSnackBar) {

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
          .then(() => console.log('logged in'))
          .catch(error => {
            this.snackBar.open(error.message, '', {
              duration: 5000 });
          });

      }
}
