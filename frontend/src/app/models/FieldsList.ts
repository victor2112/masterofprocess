import { FieldsItem } from "./FieldsItem";

export class FieldsList {
    status : number;
    data : Array<FieldsItem>;
    message : string;

    constructor(status : number, data: Array<FieldsItem>, message: string) {
        this.status = status;
        this.data = data;
        this.message = message;
    }
}

