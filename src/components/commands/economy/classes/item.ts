export default class item {
    public readonly price: number;
    public readonly name: string;
    public readonly description: string;
    public readonly emoji: string;

    constructor(price: number, name: string, description: string, emoji: string) {
        this.price = price;
        this.name = name;
        this.description = description;
        this.emoji = emoji;
    }


}