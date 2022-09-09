import { Timestamp } from "rxjs";

export class InstancesItem {
    idInstancia: number;
    idEstado: number;
    estado: string;
    fechaCreacion: string;
    fechaModificacion: string;
    
    

    constructor(idInstancia: number, idEstado: number, estado: string, fechaCreacion: string, fechaModificacion: string) {
        this.idInstancia = idInstancia;
        this.idEstado = idEstado;
        this.estado = estado;
        this.fechaCreacion = fechaCreacion;
        this.fechaModificacion = fechaModificacion;
    }

}