import { InstancesItem } from "./InstancesItem";

export class InstancesList {
    status : number;
    data : Array<InstancesItem>;
    message : string;

    constructor(status : number, data: Array<InstancesItem>, message: string) {
        this.status = status;
        this.data = data;
        this.message = message;
    }
}

