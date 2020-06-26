import React from "react";

import "./SearchBar.css";

const SearchBar = ({ setVidId, changeVideo }) => {
    return (
        <input
            id="searchBar"
            placeholder="Enter YouTube URL..."
            onKeyDown={(e) => {
                if (e.keyCode === 13) {
                    // could add validation here, to return an error message
                    setVidId(e.target.value);
                    changeVideo(e);
                }
            }}
        ></input>
    );
};

export default SearchBar;
