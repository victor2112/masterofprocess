export class UsuarioItem {
    idUsuario: number;
    nombre: string;
    departamento: string;
    idTipoUsuario: number;
    usuario: string;
    password: string;
    email: string;
    

    constructor(idUsuario: number, nombre: string, departamento: string, idTipoUsuario: number, usuario: string, password: string, email: string) {
        this.idUsuario = idUsuario;
        this.nombre = nombre;
        this.departamento = departamento;
        this.idTipoUsuario = idTipoUsuario;
        this.usuario = usuario;
        this.password = password;
        this.email = email;
    }

}

