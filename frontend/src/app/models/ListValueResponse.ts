import { ListValue } from "./ListValue";

export class ListValueResponse {
    status: number;
    data: Array<ListValue>;
    message: string;
    

    constructor(status: number, data: [], message: string) {
        this.status = status;
        this.data = data;
        this.message = message;
    }

}