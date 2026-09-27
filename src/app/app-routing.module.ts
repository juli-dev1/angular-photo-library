import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryComponent } from './features/gallery/gallery.component';
import { FavoritesComponent } from './features/favorites/favorites.component';

const routes: Routes = [
  {
    path: 'home',
    component: GalleryComponent,
  },
  {
    path: 'favorites',
    component: FavoritesComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
