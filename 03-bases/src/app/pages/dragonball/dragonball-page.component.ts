import { Component, computed, signal } from '@angular/core';
import { NgClass } from "../../../../node_modules/@angular/common/common_module.d-NEF7UaHr";

interface Character {
  id: number;
  name: string;
  power: number;
}


@Component({
  templateUrl: './dragonball-page.component.html',
  imports: [
    //NgClass

  ],
})



export class DragonballPageComponent {

  name = signal('');
  power = signal(0);

  characters = signal<Character[]>([
    {id:1,name:'Goku', power : 9001},
    /*{id:2,name:'Vegeta', power : 8001},
    {id:3,name:'Piccolo', power : 3001},
    {id:4,name:'Yamcha', power : 500},*/
  ]);
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

  resetFields(){
    this.name.set('');
    this.power.set(0);
  }
  //powerClasses = computed(()=>{
  //  return {
   //   'text-danger' : true,
    //};
  //});

}
