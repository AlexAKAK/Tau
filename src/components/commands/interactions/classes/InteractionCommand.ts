import CommandClass from "../../../classes/CommandClass.js";

export default abstract class InteractionCommand extends CommandClass {
    static async getGif(action: string) {
        const res = await fetch(`https://api.otakugifs.xyz/gif?reaction=${action}&format=gif`)
        const data: object = await res.json()
        const gif: string = data['url']
        console.log('gif')

        return gif
    }
}