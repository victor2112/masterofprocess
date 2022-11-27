export class FieldsItem {
    idFormulario: number;
    nombre: string;
    pos: number;
    tipo: string;
    idLista: number;
    externalProcess: number;
    externalIdForm: number;
    externalPos: number;
    externalKeyPos: number;
    externalKeyValue: number;
    
    

    constructor(idFormulario: number, nombre: string, pos: number, tipo: string, idLista: number,
        externalProcess: number, externalIdForm: number, externalPos: number, externalKeyPos: number, externalKeyValue: number) {
        this.idFormulario = idFormulario;
        this.pos = pos;
        this.nombre = nombre;
        this.tipo = tipo;
        this.idLista = idLista;
        this.externalProcess = externalProcess;
        this.externalIdForm = externalIdForm;
        this.externalPos = externalPos;
        this.externalKeyPos = externalKeyPos;
        this.externalKeyValue = externalKeyValue;
    }

}