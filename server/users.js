const { nanoid } = require("nanoid");

let users = [];

addUser = (name, room, id) => {
    // TODO: make sure that the user name is unique.
    // add a user to their room
    let userName = name.trim();
    let userRoom = room.trim();

    const usersInRoom = getUsersInRoom(room);
    if (usernameInRoom(name, usersInRoom)) {
        userName = `${userName}-${nanoid(4)}`;
    }
    // each user begins with a default video link which can be updated
    user = {
        name: userName,
        room: userRoom,
        id,
    };

    users.push(user);
    return user;
};

removeUser = (id) => {
    // remove a user from their room
    const user = users.findIndex((user) => user.id === id);
    users.splice(user, 1);
};

getUser = (id) => users.find((user) => user.id === id);

usernameInRoom = (name, roomUsers) =>
    roomUsers.find((user) => user.name === name);

getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom,
};
