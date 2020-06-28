rooms = [];

addRoom = (name) => {
    let room = {
        name: name,
        currentState: false,
        playingVideo: "https://www.youtube.com/watch?v=ZTFTngOG2bg",
        videoPosition: 0,
    };
    rooms.push(room);
    return room;
};

getRoom = (name) => rooms.find((room) => room.name === name);

removeRoom = (name) => {
    const room = rooms.findIndex((room) => room.name === name);
    rooms.splice(room, 1);
};

module.exports = { addRoom, getRoom, removeRoom };
