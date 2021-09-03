const ytsr = require('ytsr')


ytsr('mcjuuggernuggets', {type: 'video'}).then(data => console.log(data.items[0]))