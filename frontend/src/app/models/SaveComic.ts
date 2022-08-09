
export class SaveComic {
    nombre: string;
    año: number;
    sinopsis: string;
    editorial: string;
    usuario: number;

    constructor(nombre: string, año: number, sinopsis: string, editorial: string, usuario: number) {
        this.nombre = nombre;
        this.año = año;
        this.sinopsis = sinopsis;
        this.editorial = editorial;
        this.usuario = usuario;
    }

}