import { ListsItem } from "./ListsItem";

export class ListsList {
    status : number;
    data : Array<ListsItem>;
    message : string;

    constructor(status : number, data: Array<ListsItem>, message: string) {
        this.status = status;
        this.data = data;
        this.message = message;
    }
}