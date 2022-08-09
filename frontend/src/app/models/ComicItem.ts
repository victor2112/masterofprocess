export class ComicItem {
    id: number;
    nombre: string;
    anio: number;
    sinopsis: string;
    editorial: string;
    usuario: number;
    

    constructor(id: number, nombre: string, anio: number, sinopsis: string, editorial: string, usuario: number) {
        this.id = id;
        this.nombre = nombre;
        this.anio = anio;
        this.sinopsis = sinopsis;
        this.editorial = editorial;
        this.usuario = usuario;
    }

}

