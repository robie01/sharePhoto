import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatListModule, MatSidenavModule} from '@angular/material';


import { AppComponent } from './app.component';
import {AlbumsModule} from './albums/albums.module';
import { AppRoutingModule } from './/app-routing.module';
import {SharedModule} from './shared/shared.module';



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
    MatListModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
