import React, { Component } from "react";
import { SwipeableDrawer, Avatar, Button } from "@material-ui/core";
import { withRouter } from "react-router";
import axios from "../config";

class Sidebar extends Component {
    state = {
        category: [],
        showsub: false,
    };

    componentDidMount = async () => {
        const category = await axios.get("/category");

        this.setState({ category: category.data });
    };

    handleCategory = (e) => {
        this.props.history.push(`/product/${e.target.id}`);
        this.props.handleMenu();
    };

    render() {
        return (
            <div id="sidebar">
                <SwipeableDrawer
                    open={this.props.open}
                    anchor="left"
                    onClose={this.props.handleMenu}
                    onOpen={this.props.handleMenu}
                >
                    {this.state.showsub ? (
                        <div id="side-categories">
                            <div
                                id="back"
                                class="rounded-circle"
                                onClick={() => {
                                    this.setState({ showsub: false });
                                }}
                            >
                                <i
                                    class="fa fa-arrow-left"
                                    aria-hidden="true"
                                ></i>
                            </div>
                            <ul className="side-category">
                                {this.state.category.map((category) => (
                                    <li
                                        id={category}
                                        key={category}
                                        onClick={(e) => {
                                            this.handleCategory(e);
                                        }}
                                    >
                                        {category}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : null}

                    {!this.state.showsub ? (
                        <>
                            {localStorage.getItem("authenticated") ? (
                                <div id="side-profile">
                                    <Avatar id="side-avatar">
                                        {localStorage
                                            .getItem("name")[0]
                                            .toUpperCase()}
                                    </Avatar>
                                    <h3> {localStorage.getItem("name")}</h3>
                                </div>
                            ) : (
                                <div id="side-profile">
                                    <Avatar>G</Avatar>
                                    <h3> Guest</h3>
                                </div>
                            )}
                            <ul id="list">
                                <li
                                    id="home"
                                    onClick={() => {
                                        this.props.history.push("/");
                                    }}
                                >
                                    <i
                                        class="fa fa-home"
                                        aria-hidden="true"
                                    ></i>
                                    &nbsp; Home
                                </li>
                                <li
                                    id="about"
                                    onClick={() => {
                                        this.props.history.push("/about");
                                    }}
                                >
                                    <i
                                        class="fa fa-users"
                                        aria-hidden="true"
                                    ></i>
                                    &nbsp; About
                                </li>
                                <li
                                    id="product"
                                    onClick={() => {
                                        this.setState({ showsub: true });
                                    }}
                                >
                                    <i
                                        class="fa fa-shopping-bag"
                                        aria-hidden="true"
                                    ></i>
                                    &nbsp; Shop
                                </li>

                                {this.props.loggedin ? (
                                    <li
                                        id="side-orders"
                                        onClick={() => {
                                            this.props.history.push("/orders");
                                        }}
                                    >
                                        <i
                                            class="fa fa-cart-plus"
                                            aria-hidden="true"
                                        ></i>
                                        &nbsp; Orders
                                    </li>
                                ) : null}

                                <li
                                    id="contact"
                                    onClick={() => {
                                        this.props.history.push("/contact");
                                    }}
                                >
                                    <i
                                        class="fa fa-phone"
                                        aria-hidden="true"
                                    ></i>
                                    &nbsp; Contact
                                </li>

                                {this.props.loggedin ? (
                                    <Button
                                        id="side-logout"
                                        variant="outlined"
                                        onClick={() => {
                                            this.props.logout();
                                            localStorage.clear();
                                            this.props.history.push("/");
                                        }}
                                    >
                                        Logout &nbsp;
                                        <i
                                            class="fa fa-sign-out"
                                            aria-hidden="true"
                                        ></i>
                                    </Button>
                                ) : (
                                    <Button
                                        id="side-login"
                                        variant="outlined"
                                        onClick={() => {
                                            this.props.handleOpen();
                                        }}
                                    >
                                        Login
                                    </Button>
                                )}
                            </ul>
                        </>
                    ) : null}
                </SwipeableDrawer>
            </div>
        );
    }
}
export default withRouter(Sidebar);
