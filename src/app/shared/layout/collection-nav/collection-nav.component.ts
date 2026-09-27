import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-collection-nav',
  standalone: false,
  templateUrl: './collection-nav.component.html',
  styleUrls: ['./collection-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollectionNavComponent {}