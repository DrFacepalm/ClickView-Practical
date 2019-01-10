const http = require("http");
var server = http.createServer((function(request, response) {
     response.writeHead(200, { 'Content-Type': 'text/plain' });
}));
server.listen(8000, 'localhost');
// Please note i have not dealt with creating, running or working with servers
// in any way.
// ^ this is just placeholder code to show that a server is supposed to exist...

const Video = require('./video.js');
const fs = require('fs');
const videos = require('./videos.json');
const videoMap = new Map();
const Crud = require('./CRUD_API.js');

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
