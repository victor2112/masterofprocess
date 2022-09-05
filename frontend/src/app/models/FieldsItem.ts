export class FieldsItem {
    idFormulario: number;
    nombre: string;
    pos: number;
    tipo: string;
    idLista: number;
    
    

    constructor(idFormulario: number, nombre: string, pos: number, tipo: string, idLista: number) {
        this.idFormulario = idFormulario;
        this.pos = pos;
        this.nombre = nombre;
        this.tipo = tipo;
        this.idLista = idLista;
    }

}