import React, { Component } from "react";
import notfound from "../images/2456051.jpg";

export default class Notfound extends Component {
    render() {
        return (
            <div id="not">
                <img src={notfound} id="notfound" />
            </div>
        );
    }
}
