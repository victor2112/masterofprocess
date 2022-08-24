export class ProcessItem {
    idProceso: number;
    nombreProceso: string;
    visibles: number;
    total: number;
    
    

    constructor(idProceso: number, nombreProceso: string, visibles: number, total: number) {
        this.idProceso = idProceso;
        this.nombreProceso = nombreProceso;
        this.visibles = visibles;
        this.total = total;
    }

}