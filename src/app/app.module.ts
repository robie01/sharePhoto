import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatIconModule, MatListModule, MatSidenavModule} from '@angular/material';


import { AppComponent } from './app.component';
import {AlbumsModule} from './albums/albums.module';
import { AppRoutingModule } from './/app-routing.module';
import {SharedModule} from './shared/shared.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import { environment } from '../environments/environment';
import {AngularFireModule} from 'angularfire2';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    AlbumsModule,
    AppRoutingModule,
    SharedModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase)



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
