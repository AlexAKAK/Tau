import { MessageButton } from "discord-buttons"

export default function makeStopButton() {
    const skipButton = new MessageButton()
    skipButton.setStyle('red')
    skipButton.setID('stop')
    skipButton.setLabel('Stop Playing')

    return skipButton
}