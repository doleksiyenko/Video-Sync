import React from "react";
import Circle from "react-bootstrap-icons/dist/icons/circle-fill";
import "./UsersBar.css";

const UsersBar = ({ usersInSession }) => {
    const listItems = usersInSession.map((user, i) => (
        <li key={i}>
            <Circle id="online-status"></Circle>
            {user.name}
        </li>
    ));

    return (
        <div>
            <ul id="userList">{listItems}</ul>
        </div>
    );
};
export default UsersBar;
