import { ThisReceiver } from "@angular/compiler";

export class SaveField {
    idForm: number;
    pos: number;
    idType: number;
    name: string;
    idList: number;
    externalProcess: number;
    externalIdForm: number;
    externalPos: number;
    externalKeyPos: number;
    externalKeyValue: number;

    constructor(idForm: number, pos: number, idType: number, name: string, idList: number,
        externalProcess: number, externalIdForm: number, externalPos: number, externalKeyPos: number, externalKeyValue: number) {
        this.idForm = idForm;
        this.pos = pos;
        this.idType = idType;
        this.name = name;
        this.idList = idList;
        this.externalProcess = externalProcess;
        this.externalIdForm = externalIdForm;
        this.externalPos = externalPos;
        this.externalKeyPos = externalKeyPos;
        this.externalKeyValue = externalKeyValue;
    }

}