import { StatesItem } from "./StatesItem";

export class StatesList {
    status : number;
    data : Array<StatesItem>;
    message : string;

    constructor(status : number, data: Array<StatesItem>, message: string) {
        this.status = status;
        this.data = data;
        this.message = message;
    }
}

