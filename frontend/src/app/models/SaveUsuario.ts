
export class SaveUsuario {
    nombre: string;
    usuario: string;
    password: string;
    fecha_nacimiento: Date;
    sexo: string;

    constructor(nombre: string, usuario: string, password: string, fecha_nacimiento: Date, sexo: string) {
        this.nombre = nombre;
        this.usuario = usuario;
        this.password = password;
        this.fecha_nacimiento = fecha_nacimiento;
        this.sexo = sexo;
    }

}