import { ListValue } from "./ListValue";

export class Lists {
    idList: number;   
    values: ListValue[];
    

    constructor(idList: number, values: ListValue[]) {
        this.idList = idList;
        this.values = values;
    }

}