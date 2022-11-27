export class LogItem {
    idLog: number;
    idInstance: number;
    idUser: string;
    userName: string;
    modificationDate: string;
    idLogType: number;
    typeName: string;
    oldData: string;
    newData: string;

    
    constructor(idLog: number,
        idInstance: number,
        idUser: string,
        userName: string,
        modificationDate: string,
        idLogType: number,
        typeName: string,
        oldData: string,
        newData: string) {
            
        this.idLog = idLog;
        this.idInstance = idInstance;
        this.idUser = idUser;
        this.userName = userName;
        this.modificationDate = modificationDate;
        this.idLogType = idLogType;
        this.typeName = typeName;
        this.oldData = oldData;
        this.newData = newData;


    }

}