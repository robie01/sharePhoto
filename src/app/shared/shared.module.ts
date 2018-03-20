import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import {MatButtonModule, MatIconModule, MatToolbarModule} from '@angular/material';
import { MarginIconComponent } from './margin-icon/margin-icon.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { UploadDirective } from './directives/upload.directive';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule
  ],
  declarations: [ToolbarComponent, MarginIconComponent, UploadDirective],
  exports: [ToolbarComponent, MarginIconComponent, UploadDirective]
})
export class SharedModule { }
