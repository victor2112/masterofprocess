import { PermissionsItem } from "./PermissionsItem";

export class PermissionsList {
    status : number;
    data : Array<PermissionsItem>;
    message : string;

    constructor(status : number, data: Array<PermissionsItem>, message: string) {
        this.status = status;
        this.data = data;
        this.message = message;
    }
}
