export class Values {
    idFormulario: number;
    pos: number;
    nombre: string;
    valor: string;
    tipo: string;
    idLista: number;
    
    

    constructor(idFormulario: number, pos: number, nombre: string, valor: string, tipo: string, idLista: number) {
        this.idFormulario = idFormulario;
        this.pos = pos;
        this.nombre = nombre;
        this.valor = valor;
        this.tipo = tipo;
        this.idLista = idLista;
    }

}