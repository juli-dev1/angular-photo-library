import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { PhotoDetailComponent } from './photo-detail.component';

@NgModule({
  declarations: [PhotoDetailComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule.forChild([{ path: '', component: PhotoDetailComponent }])
  ]
})
export class PhotoDetailModule {}