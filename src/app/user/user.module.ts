import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserService} from './shared/user.service';
import {ProfileComponent} from './profile/profile.component';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSnackBarModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AngularFirestoreModule} from 'angularfire2/firestore';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatIconModule,
    AngularFirestoreModule
  ],
  declarations: [ProfileComponent],
  providers: [UserService]
})
export class UserModule { }