function addNumbres(a: number, b: number):number{
    return a +b;
}

const addNumbresArrow = (a: number, b: number):string => {
    return `s{ a + b}`;
}

function multiply(firstNumber:number, secondNumber?:number, base:number=2){
    return (firstNumber * base) ;
}


//const result = addNumbres(1,2);
//const result2 = addNumbres(1,2);
//const multiResult : number = multiply(5);
//console.log({result, result2, multiResult});


interface Character {
    name: string;
    hp: number;
    showHp: ()=> void;
}

const healCaracter = (character: Character, amount: number) => {
    character.hp += amount;

}

const strider : Character = {
    name: 'strider',
    hp :50,
    showHp () { 
        console.log(`Puntos de vida: ${strider.hp}`)
    }
}

healCaracter(strider, 10);






strider.showHp();

export{};