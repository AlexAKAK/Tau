const spdl = require('spotify-url-info')



spdl.getTracks('https://open.spotify.com/playlist/2AMSyBkXMTXMhIs7Co5MPq').then(tracks => console.log(tracks[0]['explicit']))