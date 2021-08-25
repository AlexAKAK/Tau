export default class ytVideo {
    public URL: string;
    public title: string;
    public thumbnail: object

    constructor(URL: string, title: string, thumbnail: object) {
        this.URL = URL
        this.title = title
        this.thumbnail = thumbnail
    }
}