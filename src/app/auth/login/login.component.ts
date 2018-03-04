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
    this.authService.login('o@gmail.dk', 'abcdefg')
      .then(() => {console.log('logged in')

        this.authService.isAuthenticated()
          .subscribe(authState => console.log(authState),
            error2 => console.log(error2),
            () => console.log('complete'));
      })
      .catch(error => console.log(error));

  }
}
