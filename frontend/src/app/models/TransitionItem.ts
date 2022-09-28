export class TransitionItem {
    idTransition: number;
    origin: string;
    idOrigin: number;
    destiny: string;
    idDestiny: number;
    processName: string;
    idProcess: number;
    

    constructor(idTransition: number, origin: string, idOrigin: number, destiny: string, idDestiny: number, processName: string, idProcess: number) {
        this.idTransition = idTransition;
        this.origin = origin;
        this.idOrigin = idOrigin;
        this.destiny = destiny;
        this.idDestiny = idDestiny;
        this.processName = processName;
        this.idProcess = idProcess;
    }

}