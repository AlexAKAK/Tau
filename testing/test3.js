const spdl = require('spotify-url-info')
spdl.getData('https://open.spotify.com/playlist/23HmhAZieytXqMt7FvSiZO')
.then(data => console.log(data.name))
