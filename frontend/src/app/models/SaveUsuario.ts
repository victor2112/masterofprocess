
export class SaveUsuario {
    nombre: string;
    departamento: string;
    usuario: string;
    password: string;
    email: string;

    constructor(nombre: string, departamento: string, usuario: string, password: string, email: string) {
        this.nombre = nombre;
        this.departamento = departamento;
        this.usuario = usuario;
        this.password = password;
        this.email = email;
    }

}