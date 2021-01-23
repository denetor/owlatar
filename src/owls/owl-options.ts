import {options} from 'tsconfig-paths/lib/options';

export class OwlOptions {
    sizeX: number;
    sizeY: number;
    backgroundColor: string = 'standard'; // [standard|transparent|<rgb>]
    backgroundPattern: string = 'standard';
    bodyColor: string = 'standard';
    bodyAspect: number = 1.0; // default round body
    eyesColor: string = 'standard';
    eyesStyle: string = 'standard';
    wingsColor: string = 'standard';
    wingsPattern: string = 'standard';
    beakColor: string = 'standard';
    beakPattern: string = 'standard';
    bellyColor: string = 'standard';
    bellyPattern: string = 'standard';
    feetColor: string = 'standard';
    feetPattern: string = 'standard';

    constructor(optionsCode: string) {
        //
    }
}
