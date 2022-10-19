export class PermissionsItem {
    idPermission: number;
    idUsuario: number;
    userName: number;
    idEstado: number;
    stateName: number;
    idProcess: number;
    processName: number;
    

    constructor(idPermission: number, idUsuario: number, userName: number, idEstado: number, stateName: number, idProcess: number, processName: number) {
        this.idPermission = idPermission;
        this.idUsuario = idUsuario;
        this.userName = userName;
        this.idEstado = idEstado;
        this.stateName = stateName;
        this.idProcess = idProcess;
        this.processName = processName;
    }

}