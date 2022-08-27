import { UsuarioItem } from "./UsuarioItem";

export class UsuarioList {
    status : number;
    data : Array<UsuarioItem>;
    message : string;

    constructor(status : number, data: Array<UsuarioItem>, message: string) {
        this.status = status;
        this.data = data;
        this.message = message;
    }
}

