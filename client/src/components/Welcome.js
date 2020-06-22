import React, { useState } from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
    let [room, setRoom] = useState("");
    let [name, setName] = useState("");

    return (
        <div>
            <h1>Welcome. Join A Room.</h1>
            <form>
                <input
                    placeholder="Enter Room Name"
                    onChange={(event) => setRoom(event.target.value)}
                ></input>
                <input
                    placeholder="Enter Username"
                    onChange={(event) => setName(event.target.value)}
                ></input>
                {/* when we link, need to check whether the room/name entry is empty */}
                <Link
                    to={{
                        pathname: "/room",
                        search: `?room=${room}&name=${name}`,
                    }}
                >
                    <button type="submit">Join</button>
                </Link>
            </form>
        </div>
    );
};

export default Welcome;
