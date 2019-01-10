const fs = require('fs');

// I know that this is a bad way of getting classes between files, but i don't
// know how to do it otherwise
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

// Creates video with the paramaters specified, adds it to a videoMap specified
// and saves any changes to permanentVideo.json
module.exports.createVideo = function(videoMap, name, duration, description, dateCreated, id, thumbnail, folder, tags) {
    // check if video with same id exists
    var v = videoMap.get(id);
    if (v) {
        console.log("video with same id already exists");
        return;
    }

    // create new video
    const video = new Video (
        name,
        duration,
        description,
        dateCreated,
        id,
        thumbnail,
        folder,
        tags
    )

    // set video in new map
    videoMap.set(id, video);

    // update permanent storage
    fs.writeFile('permanentVideo.json', JSON.stringify([...videoMap]), function(err) {
        if (err) {
            throw err;
        }
        console.log('saved');
    });
}

// Retrieves a video from a specificed videoMap given a videoId
module.exports.retrieveVideo = function(videoMap, videoId) {
    // assuming the correct videoMap is retrieved
    //get video from the map
    var video = videoMap.get(videoId);
    return video;
}

// Not sure about this function in particular.
// In this case, a new video object must be made in order to replace the old one
module.exports.updateVideo = function(videoMap, videoId, newVideo) {
    videoMap.set(videoId, newVideo);

    // update permanent storage
    fs.writeFile('permanentVideo.json', JSON.stringify([...videoMap]), function(err) {
        if (err) {
            throw err;
        }
        console.log('saved');
    });
}

// Deletes a video from a specificed videoMap given the videoId
module.exports.deleteVideo = function(videoMap, videoId) {
    // assuming correct videoMap
    videoMap.delete(videoId);

    // update permanent storage
    fs.writeFile('permanentVideo.json', JSON.stringify([...videoMap]), function(err) {
        if (err) {
            throw err;
        }
        console.log('saved');
    });
}
