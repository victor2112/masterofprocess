import { Values } from "./Values";

export class Forms {
    status : number;
    data : Array<Values>;
    message : string;

    constructor(status : number, data: Array<Values>, message: string) {
        this.status = status;
        this.data = data;
        this.message = message;
    }
}

