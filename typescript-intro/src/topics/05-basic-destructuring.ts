

interface AudioPlayer {
    audioVolume: number;
    songDuration: number;
    song: string;
    details: Details;
}

interface Details {
    author: string;
    year: number;
}

const audioPlayer: AudioPlayer = {
    audioVolume: 90,
    songDuration: 36,
    song: "mess",
    details: {
        author: "Ed Sheeran",
        year: 2015
    }
}
const song = 'New Song';

const{
    song:anothersong, 
    songDuration:duration,
    details
} = audioPlayer; //desestructuración básica

const {author} = details;

//details > author

 
console.log('Song: ' , anothersong );
console.log('Duration: ' , duration);
console.log('Author: ' , author);


export {};