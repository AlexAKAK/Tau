"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function getAccessToken(clientID) {
    return __awaiter(this, void 0, void 0, function* () {
        let authURL = `https://accounts.spotify.com/en/authorize?${clientID}&response_type=code&redirect_url=http:%2F%2F127.0.0.1:5500Findex.html&show_dialog=true&scope=user-read-private%20user-read-email%20user-modify-playback-state%20user-read-playback-position%20user-library-read%20streaming%user-read-playback-state%20user-read-recently-played%20playlist-read-private`;
        console.log(authURL);
    });
}
exports.default = getAccessToken;
