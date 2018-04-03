import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileService } from './file.service';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireStorage} from 'angularfire2/storage';

@NgModule({
  imports: [
    CommonModule,
    AngularFirestoreModule
  ],
  declarations: [],
  providers: [FileService, AngularFireStorage]
})
export class FileSystemModule { }
