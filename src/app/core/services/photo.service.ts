import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Photo } from '../models/photo.model';

@Injectable({ providedIn: 'root' })

export class PhotoService {
  private readonly delay = 250; // In ms

  getBatch(page: number, pageSize: number): Observable<Photo[]> {
    const photos = this.createPhotoBatch(page, pageSize);

    return of(photos).pipe(
      delay(this.delay),
    );
  }

  private createPhotoBatch(page: number, pageSize: number): Photo[] {
    const firstId = page * pageSize + 1;

    return Array.from({ length: pageSize }, (value, index) => {
      const id = firstId + index;

      return this.createPhoto(id);
    });
  }

  private createPhoto(id: number): Photo {
    return {
      id,
      url: `https://picsum.photos/200/300?random=${id}`,
      alt: `Random photo ${id}`,
    };
  }
}