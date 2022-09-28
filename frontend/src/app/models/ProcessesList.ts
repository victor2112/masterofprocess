import { ProcessesItem } from "./ProcessesItem";

export class ProcessesList {
    status : number;
    data : Array<ProcessesItem>;
    message : string;

    constructor(status : number, data: Array<ProcessesItem>, message: string) {
        this.status = status;
        this.data = data;
        this.message = message;
    }
}

