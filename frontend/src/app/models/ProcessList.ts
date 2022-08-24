import { ProcessItem } from "./ProcessItem";

export class ProcessList {
    status : number;
    data : Array<ProcessItem>;
    message : string;

    constructor(status : number, data: Array<ProcessItem>, message: string) {
        this.status = status;
        this.data = data;
        this.message = message;
    }
}

