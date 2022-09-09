import { TransitionItem } from "./TransitionItem";

export class TransitionList {
    status : number;
    data : Array<TransitionItem>;
    message : string;

    constructor(status : number, data: Array<TransitionItem>, message: string) {
        this.status = status;
        this.data = data;
        this.message = message;
    }
}

