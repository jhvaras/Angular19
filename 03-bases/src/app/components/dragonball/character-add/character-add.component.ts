import { Character } from '../../../Interfaces/character.interface';
import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';

@Component({
  selector: 'app-character-add',
  templateUrl: './character-add.component.html',
})
export class CharacterAddComponent {
name =signal("")
power = signal(0)

newCharacter = output<Character>();

addCharacter() {

      if(!this.name() || !this.power() || this.power()<=0){
        return;
      }
      //console.log(this.name(),this.power());

      const newCharacter:Character = {
         //id:this.Charactercters().length +1,
         id: Math.floor(Math.random()*1000),
         name : this.name(),
         power:this.power()
      };
      //return this.characters().push(newCharacter);
      //this.characters.update((list)=>[...list,newCharacter]);
      //console.log({newCharacter});
      this.newCharacter.emit(newCharacter);
      this.resetFields();
}
resetFields(){
    this.name.set('');
    this.power.set(0);
  }




}
