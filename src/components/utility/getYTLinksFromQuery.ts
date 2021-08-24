import constructYTLinkFromVideoID from "./constructYTLinkFromVideoID";

const youtubesearchapi = require('youtube-search-api');

export default async function getYTLinksFromQuery(query: string): Promise<string[]> {

    const resultsObject: object = await youtubesearchapi.GetListByKeyword(query)
    console.log(resultsObject)
    const results = resultsObject['items']

    let links: string[] = [];
    for (let i = 0; i < results.length; i++) {
        if (results[i]['type'] == 'video') links.push(constructYTLinkFromVideoID(results[i]['id']))
    }
    return links
    
}