export default class ytChannel {
    public name: string
    public URL: string
    public thumbnail: object

    constructor(name: string, URL: string, thumbnail: object) {
        this.name = name
        this.URL = URL
        this.thumbnail = thumbnail
    }
}