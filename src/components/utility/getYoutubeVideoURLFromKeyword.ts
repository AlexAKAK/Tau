const ytSearch = require('youtube-search')
const sendEmbed = require('./embeds/sendEmbed')

// config
const youtubeAPIKey = require('./../../../config.json')['youtubeAPIKey']

const opts = {
    maxResults : 1,
    key: youtubeAPIKey,
} 
// / config

// the function
function getYoutubeVideoUrlFromKeyword(keyWords: string): Promise<unknown> {
    // keyWords: string

    const urlPromise = new Promise(function(resolve, reject) {
        ytSearch(keyWords, opts, (err: Error, results: any[]) => {
            if (err) {
                console.log(err)
                return null
            }
            else {
                if (results.length == 0) resolve(null)
                else resolve(results[0]['link'])
            }
        })


    })

    return urlPromise

}

module.exports = getYoutubeVideoUrlFromKeyword