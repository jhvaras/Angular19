import { Component, inject } from '@angular/core';
import { CharacterListComponent } from "../../components/dragonball/character-list/character-list.component";
import { CharacterAddComponent } from '../../components/dragonball/character-add/character-add.component';
import { DragonBallService } from '../../services/dragonball.service';



@Component({
  templateUrl: './dragonball-super-page.component.html',
  selector: 'dragonball-super',
  imports: [CharacterListComponent,CharacterAddComponent],
})



export class DragonballSuperPageComponent {

  public DragonBallService = inject(DragonBallService);

  /* inyecction tradicional de servicios
  constructor(
    public dragonBallService: DragonBallService
  ) { }
  */
/*
  name = signal('');
  power = signal(0);*/
/*
  characters = signal<Character[]>([
    {id:1,name:'Goku', power : 9001},
    {id:2,name:'Vegeta', power : 8001},
  ]);

  addCharacter(character: Character){
    this.characters.update(
      list => [...list,character]
    );
  }*/
/*
  addCharacter() {
    if(!this.name() || !this.power() || this.power()<=0){
      return;
    }
    //console.log(this.name(),this.power());

    const newCharacter:Character = {
       id:this.characters().length +1,
       name : this.name(),
       power:this.power()
    };
    //return this.characters().push(newCharacter);
    this.characters.update((list)=>[...list,newCharacter]);
    this.resetFields();
  }
*/
/*
  resetFields(){
    this.name.set('');
    this.power.set(0);
  }
    */
  //powerClasses = computed(()=>{
  //  return {
   //   'text-danger' : true,
    //};
  //});

}
