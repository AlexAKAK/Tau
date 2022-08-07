import ytChannel from "../classes/ytChannel.js";
import constructYTLinkFromVideoID from "./constructYTLinkFromVideoID.js";

import youtubesearchapi from 'youtube-search-api';

export default async function getYTChannelFromQuery(query: string): Promise<ytChannel> {

    const resultsObject: object = await youtubesearchapi.GetListByKeyword(query)
    console.log(resultsObject)
    const results = resultsObject['items']

    for (let i = 0; i < results.length; i++) {
        if (results[i]['type'] == 'channel') return new ytChannel(results[i]['title'], `https://www.youtube.com/channel/${results[i]['id']}`, results[i]['thumbnail'])
    }
    
    return null
}