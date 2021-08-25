/*
Returns a promise for an object
the object has a property called items, which is an array of objects
each object within that array represents a search result, each having an id.


*/

var youtubesearchapi = require('youtube-search-api');

youtubesearchapi.GetListByKeyword("pewdiepie")
.then(results => console.log(results.items[1]['thumbnail']['thumbnails'][0]['url']))

// https://www.youtube.com/watch?v=yEupsNjoDUY


