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

module.exports = Video;
