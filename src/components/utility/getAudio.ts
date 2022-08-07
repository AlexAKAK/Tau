import ytdl from 'ytdl-core'



import ytdlModule from 'ytdl-core'
const getInfo = ytdlModule.getInfo



export default async function getYTDLStream(url: string) {
    const info = await getInfo(url)
    const seconds = info.videoDetails.lengthSeconds
    if (Number(seconds) == 0) return getLiveStream(url)
    else return getVideo(url)
}


function getVideo(url: string) {
    // possibly experiment with changing the highWaterMark value to make the video work better.
    const stream = ytdl(url, {filter: "audioonly", highWaterMark:  1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 *1024 * 10 })
    return stream
}


function getLiveStream(url: string) {
    const stream = ytdl(url)
    return stream
}

