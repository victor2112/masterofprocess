import { FormsItem } from "./FormsItem";

export class FormsList {
    status : number;
    data : Array<FormsItem>;
    message : string;

    constructor(status : number, data: Array<FormsItem>, message: string) {
        this.status = status;
        this.data = data;
        this.message = message;
    }
}