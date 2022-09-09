export class TransitionItem {
    process: string;
    origin: number;
    originName: string;
    destiny: number;
    destinyName: string;
    
    

    constructor(process: string, origin: number, originName: string, destiny: number, destinyName: string) {
        this.process = process;
        this.origin = origin;
        this.originName = originName;
        this.destiny = destiny;
        this.destinyName = destinyName;
    }

}