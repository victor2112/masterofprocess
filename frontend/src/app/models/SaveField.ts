
export class SaveField {
    idForm: number;
    pos: number;
    idType: number;
    name: string;
    idList: number;

    constructor(idForm: number, pos: number, idType: number, name: string, idList: number) {
        this.idForm = idForm;
        this.pos = pos;
        this.idType = idType;
        this.name = name;
        this.idList = idList;
    }

}