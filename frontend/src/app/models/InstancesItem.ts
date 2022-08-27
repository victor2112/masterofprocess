import { Timestamp } from "rxjs";

export class InstancesItem {
    idInstancia: number;
    estado: string;
    fechaCreacion: string;
    fechaModificacion: string;
    
    

    constructor(idInstancia: number, estado: string, fechaCreacion: string, fechaModificacion: string) {
        this.idInstancia = idInstancia;
        this.estado = estado;
        this.fechaCreacion = fechaCreacion;
        this.fechaModificacion = fechaModificacion;
    }

}