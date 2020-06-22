import React, { useState } from "react";
import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Welcome.css";

const Welcome = () => {
    let [room, setRoom] = useState("");
    let [name, setName] = useState("");
    let [warning, showWarning] = useState(false);

    return (
        <div id="sectionCard">
            <h1>
                Welcome. <span>Join A Room.</span>
            </h1>
            <form>
                <input
                    placeholder="Enter Room Name"
                    onChange={(event) => setRoom(event.target.value)}
                ></input>{" "}
                <br></br>
                <input
                    placeholder="Enter Username"
                    onChange={(event) => setName(event.target.value)}
                ></input>{" "}
                <br></br>
                {/* when we link, need to check whether the room/name entry is empty */}
                {room.length > 0 && name.length > 0 ? (
                    <Link
                        to={{
                            pathname: "/room",
                            search: `?room=${room}&name=${name}`,
                        }}
                    >
                        <Button className="btn btn-primary" type="submit">
                            Join
                        </Button>
                    </Link>
                ) : (
                    <Button
                        className="disabled"
                        onClick={() => showWarning(true)}
                    >
                        Join
                    </Button>
                )}
            </form>
        </div>
    );
};

export default Welcome;
