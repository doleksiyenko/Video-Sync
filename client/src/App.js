import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Welcome from "./components/Welcome";
import VideoSync from "./components/VideoSync";

const App = () => {
    return (
        <Router>
            <Route exact path="/" component={Welcome}></Route>
            <Route path="/room" component={VideoSync}></Route>
        </Router>
    );
};

export default App;
