import constructYTLinkFromVideoID from "./constructYTLinkFromVideoID";

const youtubesearchapi = require('youtube-search-api');

export default async function getYTChannelFromQuery(query: string): Promise<string> {

    const resultsObject: object = await youtubesearchapi.GetListByKeyword(query)
    console.log(resultsObject)
    const results = resultsObject['items']

    for (let i = 0; i < results.length; i++) {
        if (results[i]['type'] == 'channel') return ``
    }
    
}