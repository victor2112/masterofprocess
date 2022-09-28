export class ProcessesItem {
    idProcess: number;
    processName: string;
    dateCreated: string;
    formName: string;
    idForm: number;
    
    

    constructor(idProcess: number, processName: string, dateCreated: string, formName: string, idForm: number) {
        this.idProcess = idProcess;
        this.processName = processName;
        this.dateCreated = dateCreated;
        this.formName = formName;
        this.idForm = idForm;
    }

}