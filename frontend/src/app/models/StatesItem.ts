export class StatesItem {
    idState: number;
    stateName: string;
    idProcess: number;
    processName: string;
    initial: string;
    final: string;
    
    

    constructor(idState: number, stateName: string, idProcess: number, processName: string, initial: string, final: string) {
        this.idState = idState;
        this.stateName = stateName;
        this.idProcess = idProcess;
        this.processName = processName;
        this.initial = initial;
        this.final = final;
    }

}