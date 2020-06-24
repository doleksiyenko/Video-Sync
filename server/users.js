let users = [];

addUser = (name, room, id) => {
    // add a user to their room
    let userName = name.trim();
    let userRoom = room.trim();

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

getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
