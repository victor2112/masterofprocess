
export class SaveFieldValue {
    idFormulario: number;
    pos: number;
    idInstancia: number;
    valor: string;

    constructor(idFormulario: number, pos: number, idInstancia: number, valor: string) {
        this.idFormulario = idFormulario;
        this.pos = pos;
        this.idInstancia = idInstancia;
        this.valor = valor;
    }

}