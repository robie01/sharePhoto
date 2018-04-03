import { Injectable } from '@angular/core';
import {AngularFireStorage} from 'angularfire2/storage';
import {UploadTask} from './UploadTask';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class FileService {

  constructor(private angularFireStore: AngularFireStorage) { }

  upload(path: string, file: File): UploadTask {
    const task = this.angularFireStore.upload(path, file);
    return {downloadUrl: task.downloadURL()};
  }
  downloadUrlProfile(uid: string): Observable<any> {
    return this.angularFireStore.ref('profile-image/' + uid).getDownloadURL();

  }
}
