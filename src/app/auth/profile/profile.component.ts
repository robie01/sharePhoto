import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  constructor(private fb: FormBuilder) {

    this.profileForm = fb.group({
      username: '',
      firstname: '',
      lastname: '',
    });
  }

  ngOnInit() {
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
