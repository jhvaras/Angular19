import { ChangeDetectionStrategy, Component, signal } from "@angular/core";

@Component({
  templateUrl: "./counter-page.component.html",
  styles: `
    button {
      font-size: 20px;
      padding: 5px;
      margin: 5px 10px;
      width: 80px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterPageComponent {
  counter = 10;

  counterSignal = signal(10);

  constructor() {
    setInterval(() => {
      console.log('Tick');
      //this.counter +=1;
      this.counterSignal.update((v) => v+1);
  },1000);
}



  increaseby(value: number) {
    this.counter += value;
    this.counterSignal.update((current) => current + value);
  }
  resetCount(){
    this.counter= 0;
    this.counterSignal.set(0);
  }
}
