import React from "react";

import "./SearchBar.css";

const SearchBar = ({ setVidId }) => {
    return (
        <input
            id="searchBar"
            placeholder="Enter YouTube URL..."
            onKeyDown={(e) => {
                if (e.keyCode === 13) {
                    setVidId(e.target.value);
                }
            }}
        ></input>
    );
};

export default SearchBar;
