"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = getYoutubeVideoThumbnail;
function getYoutubeVideoThumbnail(url, size) {
    if (url === null) {
        return '';
    }
    size = (size === null) ? 'big' : size;
    let results = url.match('[\\?&]v=([^&#]*)');
    let video = (results === null) ? url : results[1];
    if (size === 'small') {
        return 'http://img.youtube.com/vi/' + video + '/2.jpg';
    }
    return 'http://img.youtube.com/vi/' + video + '/0.jpg';
}
;
