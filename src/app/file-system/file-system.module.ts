import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileService } from './file.service';
import {AngularFirestoreModule} from 'angularfire2/firestore';

@NgModule({
  imports: [
    CommonModule,
    AngularFirestoreModule
  ],
  declarations: [],
  providers: [FileService]
})
export class FileSystemModule { }
