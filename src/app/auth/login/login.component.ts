import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {AuthService} from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.login('e@gmail.dk', 'abcdefg')
      .then(() => {console.log('logged in')
        this.authService.logout()
          .then(() => console.log('logged out'))
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  }
}
