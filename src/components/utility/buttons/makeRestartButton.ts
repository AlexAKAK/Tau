import { MessageButton } from "discord-buttons"

export default function makeRestartButton() {
    const skipButton = new MessageButton()
    skipButton.setStyle('blurple')
    skipButton.setID('restart')
    skipButton.setLabel('Restart Song')

    return skipButton
}