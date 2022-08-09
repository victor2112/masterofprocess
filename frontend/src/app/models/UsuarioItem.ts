export class UsuarioItem {
    id: number;
    nombre: string;
    usuario: string;
    password: string;
    fecha_nacimiento: Date;
    sexo: string;
    

    constructor(id: number, nombre: string, usuario: string, password: string, fecha_nacimiento: Date, sexo: string) {
        this.id = id;
        this.nombre = nombre;
        this.usuario = usuario;
        this.password = password;
        this.fecha_nacimiento = fecha_nacimiento;
        this.sexo = sexo;
    }

}

