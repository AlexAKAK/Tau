/*
Returns a promise for an object
the object has a property called items, which is an array of objects
each object within that array represents a search result, each having an id.


*/

var youtubesearchapi = require('youtube-search-api');

youtubesearchapi.GetListByKeyword("niko on the beat")
.then(results => console.log(results))

// https://www.youtube.com/watch?v=yEupsNjoDUY


