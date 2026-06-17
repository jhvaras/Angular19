
const skill:  string[] = ['Bash','Counter','Healing','Support'] as const;


interface Character {
    name: string;
    hp: number;
    skills: string[];
    hometown?: string;
}

const strider : Character = {
    name: 'strider',
    hp: 100,
    skills: ['Bash', 'Counter']
}

strider.hometown = 'Rivendell';

console.table(strider);

export{};