import { VoiceConnection, AudioPlayer} from "@discordjs/voice";
export default class ConnectionWithPlayer extends VoiceConnection {
    // just add a player property to the connection
    public player: AudioPlayer;
}