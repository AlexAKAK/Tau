import constructYTLinkFromVideoID from "./constructYTLinkFromVideoID";

const youtubesearchapi = require('youtube-search-api');

export default async function getYTLinksFromQuery(query: string): Promise<string[]> {

    const resultsObject: object = await youtubesearchapi.GetListByKeyword("among us")
    const results = resultsObject['items']

    let links: string[] = [];
    for (let i = 0; i < results.length; i++) {
        links.push(constructYTLinkFromVideoID(results['id']))
    }
    return links
    
}