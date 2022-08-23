export class GeneralResponse {
    status: number;
    data: [];
    message: string;
    

    constructor(status: number, data: [], message: string) {
        this.status = status;
        this.data = data;
        this.message = message;
    }

}

