const ytsr = require('ytsr')

ytsr('https://www.youtube.com/watch?v=dq_SDNtWHDY')
.then(data => console.log(data.items[0]))