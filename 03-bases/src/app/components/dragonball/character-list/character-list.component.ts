import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { Character } from '../../../Interfaces/character.interface';

@Component({
  selector: 'dragonball-character-list',
  templateUrl: './character-list.component.html',
})
export class CharacterListComponent {
  characters = input.required<Character[]>();
  listName = input.required<string>();
}
