import { Component, Input } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-person-preview-button',
  templateUrl: './person-preview-button.component.html',
  styleUrl: './person-preview-button.component.scss'
})
export class PersonPreviewButtonComponent {
  @Input() person: User | null = null;
}
