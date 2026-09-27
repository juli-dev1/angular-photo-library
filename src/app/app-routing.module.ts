import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./features/gallery/gallery.module').then((module) => module.GalleryModule),
  },
  {
    path: 'favorites',
    loadChildren: () => import('./features/favorites/favorites.module').then((module) => module.FavoritesModule),
  },
  {
    path: 'photos/:id',
    loadChildren: () => import('./features/photo-detail/photo-detail.module').then((module) => module.PhotoDetailModule),
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
