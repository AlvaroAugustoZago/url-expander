const express = require('express')
const app = express()
const request = require('request')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get("/expand", (req, res) => {
    let shortUrl = req.query.shortUrl
    if(!shortUrl.startsWith('http')) shortUrl = 'https://' + shortUrl
    request({
        url: shortUrl,
        method: "HEAD",
        followAllRedirects: true
    })
    .on('response', response => res.send(response.request.href))
    .on("error", function(err){
        console.log("Problem reaching URL: ", err);
     });
})

app.listen(5000, () => {
    console.log('Server is running on port 5000')
})