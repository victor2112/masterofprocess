export class SaveComicResponse {
    status: number;
    message: string;
    
    constructor(status: number, message: string) {
        this.status = status;
        this.message = message;
    }
}