const spdl = require('spotify-url-info')



spdl.getData('https://open.spotify.com/album/1pxED0aW8v0PpojjpJQUkC').then(tracks => console.log(tracks))