import { UsuarioItem } from "./UsuarioItem";

export class UsuarioList {
    status: number;
    usuarios: Array<UsuarioItem>;

    constructor(status: number, usuarios: Array<UsuarioItem>) {
        this.status = status;
        this.usuarios = usuarios;
    }
}

