const http = require("http");
var server = http.createServer((function(request, response) {
     res.writeHead(200, { 'Content-Type': 'text/plain' });
}));
server.listen(8888);
// Please note i have not dealt with creating, running or working with servers in any way.


const fs = require('fs');
const videos = require('videos.json');
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


});

function createVideo(name, duration, description, dateCreated, id, thumbnail, folder, tags) {
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
}

function retrieveVideo(videoId) {
    var video = videoMap.get(videoId);
    return video;
}

// Not sure about this function in particular.
// In this case, a new video object must be made in order to replace the old one
function updateVideo(videoId, newVideo) {
    videoMap.set(videoId, newVideo)
}

function deleteVideo(videoId) {
    videoMap.delete(videoId)
}
