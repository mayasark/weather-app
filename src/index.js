import React from "react";
import ReactDOM from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import App from "./components/app";
import store from "./store";

ReactDOM.render(
        <Router>
            <App />
        </Router>,
    document.getElementById('root')
);