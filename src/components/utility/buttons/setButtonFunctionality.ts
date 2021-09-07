
import Tau from "../../..";
import queue from "../../commands/music/queue";
import restart from "../../commands/music/restart";
import skip from "../../commands/music/skip";
import stop from "../../commands/music/stop";
import buttonErrorChecking from "./buttonErrorChecking";


export default function setButtonFunctionality(client: Tau) {
    client.on('clickButton', async (button: any) => {
        if (button.id === 'skip'&&buttonErrorChecking.skip(button) == false) {
            buttonErrorChecking.skip(button)
            await skip.prototype.commandMain(button, client)
        }
        if (button.id === 'restart'&&buttonErrorChecking.restart(button) == false) {
            await restart.prototype.commandMain(button, client)
        }
        if (button.id === 'stop'&&buttonErrorChecking.stop(button) == false) {
            await stop.prototype.commandMain(button, client)
        }
        if (button.id === 'queue'&&buttonErrorChecking.queue(button) == false) {
            await queue.prototype.commandMain(button, client)
        }
    
        button.defer()
    });
}