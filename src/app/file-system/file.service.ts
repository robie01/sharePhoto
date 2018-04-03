import { Injectable } from '@angular/core';
import {AngularFireStorage, AngularFireUploadTask} from 'angularfire2/storage';
import {UploadTask} from './UploadTask';

@Injectable()
export class FileService {

  constructor(private angularFireStore: AngularFireStorage) { }

  upload(path: string, file: File): UploadTask {
    const task = this.angularFireStore.upload(path, file);
    return {downloadUrl: task.downloadURL()};
  }
}
