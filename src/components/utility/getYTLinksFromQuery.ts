import constructYTLinkFromVideoID from "./constructYTLinkFromVideoID";

const youtubesearchapi = require('youtube-search-api');
import ytVideo from "../classes/ytVideo";

export default async function getYTLinksFromQuery(query: string): Promise<ytVideo[]> {

    const resultsObject: object = await youtubesearchapi.GetListByKeyword(query)
    console.log(resultsObject)
    const results = resultsObject['items']

    let links: ytVideo[] = [];
    for (let i = 0; i < results.length; i++) {
        const URL: string = constructYTLinkFromVideoID(results[i]['id'])
        const video = new ytVideo(URL,results[i]['title'], results[i]['thumbnail'])
        if (results[i]['type'] == 'video') links.push(video)
    }
    return links
    
}