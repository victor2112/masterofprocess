import { LogItem } from "./LogItem";

export class LogList {
    status : number;
    data : Array<LogItem>;
    message : string;

    constructor(status : number, data: Array<LogItem>, message: string) {
        this.status = status;
        this.data = data;
        this.message = message;
    }
}