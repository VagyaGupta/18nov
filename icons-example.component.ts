import { Component } from '@angular/core';
import { matIcons } from 'projects/new-ems/src/assets/icons/mat-icons-list';

@Component({
  selector: 'ems-icons-example',
  templateUrl: './icons-example.component.html'
})
export class IconsExampleComponent {
  matIcons = matIcons
}
