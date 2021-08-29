const spotify = require('spotify-url-info')

spotify.getData('https://open.spotify.com/playlist/1Gi8ggdgM5RaQj9F7nVL7g?si=0def70c6e4744248')
.then(data => {
    for (let i = 0; i<data.tracks.items.length;i++) console.log(data.tracks.items[i].track.external_urls.spotify)
})