import { Divider } from "@material-ui/core";
import React, { Component } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

export default class Dropdown extends Component {
    render() {
        return (
            <Navbar bg="light" variant="light" fixed="top" id="dropdown">
                <div className="grid-container">
                    {this.props.categories
                        ? this.props.categories.map((c) => (
                              <div
                                  className="grid-item"
                                  id={c}
                                  key={c}
                                  onClick={(e) => {
                                      this.props.handleCategory(e);
                                  }}
                              >
                                  {c}
                              </div>
                          ))
                        : null}
                </div>
            </Navbar>
        );
    }
}
