import ytSearch from 'youtube-search'
import sendEmbed from './embeds/sendEmbed'

// config
const youtubeAPIKey = 'AIzaSyAON4YlGAdk_tuuxyGCjVnAUMC6iwHFi_A'

const opts = {
    maxResults : 1,
    key: youtubeAPIKey,
} 
// / config

// the function
export default function getYoutubeVideoUrlFromKeyword(keyWords: string): Promise<unknown> {
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