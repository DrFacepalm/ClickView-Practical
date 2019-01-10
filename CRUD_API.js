const fs = require('fs');
const Video = require('./video.js');

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
    writeJSON(videoMap, 'permanentVideo.json');
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
    var v = videoMap.get(id);
    if (!v) {
        console.log("video does not exist");
        return;
    }
    
    videoMap.set(videoId, newVideo);

    // update permanent storage
    writeJSON(videoMap, 'permanentVideo.json');
}

// Deletes a video from a specificed videoMap given the videoId
module.exports.deleteVideo = function(videoMap, videoId) {
    var v = videoMap.get(id);
    if (!v) {
        console.log("video does not exist");
        return;
    }

    // assuming correct videoMap
    videoMap.delete(videoId);

    // update permanent storage
    writeJSON(videoMap, 'permanentVideo.json');
}

// fetch videos by folder
// This will list all the videos under a certain folder
// e.g. in a search for "history", a video with "folder": "Junior->History"
// will appear in the search but "Junior->History->China" will not
module.exports.searchFolder = function(videoMap, folder) {
    var result = [];
    for (var [id, video] of videoMap.entries()) {
        if (video.folder.endsWith(folder)) {
            list.push(video);
        }
    }
    return result;
}

// fetch video by tag
// This will get all the videos with a certain tag.
module.exports.searchFolder = function(videoMap, tag) {
    var result = [];
    for (var [id, video] of videoMap.entries()) {
        if (video.tags.includes(tag)) {
            list.push(video);
        }
    }
    return result;
}

function writeJSON(videoMap, file) {
    fs.writeFile(file, JSON.stringify([...videoMap]), function(err) {
        if (err) {
            throw err;
        }
        console.log('saved');
    });
}
