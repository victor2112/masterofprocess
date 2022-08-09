import { ComicItem } from "./ComicItem";

export class ComicList {
    status: number;
    comics: Array<ComicItem>;

    constructor(status: number, comics: Array<ComicItem>) {
        this.status = status;
        this.comics = comics;
    }
}

