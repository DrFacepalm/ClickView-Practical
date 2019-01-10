const http = require("http");
var server = http.createServer((function(request, response) {
     res.writeHead(200, { 'Content-Type': 'text/plain' });
}));
server.listen(8888);
// Please note i have not dealt with creating, running or working with servers
// in any way.


const fs = require('fs');
const videos = require('./videos.json');
const videoMap = new Map();

class Video {
    constructor (
        name,
        duration,
        description,
        dateCreated,
        id,
        thumbnail,
        folder,
        tags
    ) {
        this.name = name;
        this.duration = duration;
        this.dateCreated = dateCreated;
        this.id = id;
        this.thumbnail = thumbnail;
        this.folder = folder;
        this.tags = tags;
    }

}

server.on('connect', () => {
    console.log('connected');

    for (vid in videos) {
        var v = videoMap.get(vid.id);

        if (!v) {
            const video = new Video (
                vid.name,
                vid.duration,
                vid.description,
                vid.dateCreated,
                vid.id,
                vid.thumbnail,
                vid.folder,
                vid.tags
            );

            videoMap.set(vid.id, video);

        } else {
            console.log(`Video with id ${vid.id} already exists`);
        }
    }

    // Now that all videos from videos.json are in the map, JSON.stringify the
    // Map and put the map into permanent storage
    fs.writeFile('permanentVideo.json', JSON.stringify([...videoMap]), function(err) {
        if (err) {
            throw err;
        }
        console.log('saved');
    });


});
