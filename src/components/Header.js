import React, { Component } from "react";
import { Navbar, Container } from "react-bootstrap";
import "font-awesome/css/font-awesome.min.css";
import "../App.css";
import Sidebar from "./Sidebar";
import { withRouter } from "react-router";
import { Button, Avatar } from "@material-ui/core";
import logo from "../images/download.png";
import Authenticate from "./Authenticate";
import axios from "../config";
import SearchIcon from "@material-ui/icons/Search";
import Dropdown from "./Dropdown";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import StyledBadge from "./Badge";
import IconButton from "@material-ui/core/IconButton";
class Header extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        show: false,
        category: [],
        windowWidth: window.innerWidth,
        modal: false,
        // loggedin: localStorage.getItem("access_token") ? true : false,
        loggedin:
            this.props.loggedin != null
                ? this.props.loggedin
                : localStorage.getItem("authenticated")
                ? localStorage.getItem("authenticated")
                : false,
        open: false,
    };
    componentDidMount = async () => {
        this.setState({ cart: localStorage.getItem("cartlength") });
        const category = await axios.get("/category");
        this.setState({ category: category.data });
    };

    handleClick = (e) => {
        window[`scrollTo`]({ top: 0, behavior: `smooth` });

        let elements = document.getElementsByClassName("link");
        for (var i = 0, length = elements.length; i < length; i++) {
            elements[i].style.color = "#6c757d";
        }
        document.getElementById(e.target.id).style.color = "#e1522e";
        if (e.target.id == "home") {
            this.props.history.push("/");
        } else {
            this.props.history.push("/" + e.target.id);
        }
    };

    handleMenu = () => {
        if (this.state.show) {
            this.setState({ show: false });
        } else {
            this.setState({ show: true });
        }
    };

    handleResize = () => {
        if (window.innerWidth > 750 && this.state.show) {
            this.setState({ show: false });
        }
        if (
            window.innerWidth < 850 &&
            this.state.loggedin &&
            document.getElementById("profile-dropdown-content") != null
        ) {
            document.getElementById("profile-dropdown-content").style.display =
                "none";
        }
    };

    handleCategory = (e) => {
        this.props.history.push(`/product/${e.target.id}`);
        window[`scrollTo`]({ top: 0, behavior: `smooth` });
    };

    handleModal = () => {
        this.setState({ open: false });
        if (this.props.open) this.props.close();
    };

    handleLogin = async (data) => {
        localStorage.setItem("cart", data.cart);
        localStorage.setItem("authenticated", true);
        localStorage.setItem("name", data.name);
        localStorage.setItem("email", data.email);
        this.setState({ loggedin: true });
    };

    toggleProfile = () => {
        const toggle = document.getElementById("profile-dropdown-content").style
            .display;
        if (toggle == "none") {
            document.getElementById("profile-dropdown-content").style.display =
                "block";
        } else {
            document.getElementById("profile-dropdown-content").style.display =
                "none";
        }
    };

    toggleSearch = () => {
        if (document.getElementsByName("search-main")[0].id == "search-main") {
            document.getElementById("search-main").id = "search-main-display";
        } else {
            document.getElementById("search-main-display").id = "search-main";
        }
    };

    logout = async () => {
        this.setState({
            loggedin: false,
        });
        localStorage.clear();
        await axios.post("/logout", {}, { withCredentials: true });

        this.props.history.push("/");
    };

    render() {
        window.addEventListener("resize", this.handleResize);
        return (
            <>
                <Container id="container">
                    <Navbar bg="light" variant="light" fixed="top" id="header">
                        <div id="logo-menu">
                            <i
                                class="fa fa-bars"
                                aria-hidden="true"
                                id="menu"
                                onClick={() => {
                                    this.handleMenu();
                                }}
                            ></i>
                            <Navbar.Brand id="brand" href="/">
                                <img src={logo} id="logo" />
                                PR Online Store
                            </Navbar.Brand>
                        </div>

                        <div className="menu">
                            <ul class="nav">
                                <li class="nav-link">
                                    <a
                                        onClick={(e) => {
                                            this.handleClick(e);
                                        }}
                                        id="home"
                                        className="link"
                                    >
                                        Home
                                    </a>
                                </li>
                                <li class="nav-link">
                                    <a
                                        onClick={(e) => {
                                            this.handleClick(e);
                                        }}
                                        id="about"
                                        className="link"
                                    >
                                        About Us
                                    </a>
                                </li>

                                <li class="nav-link" id="shop">
                                    <a id="product" className="link">
                                        Shop
                                    </a>
                                    <Dropdown
                                        categories={this.state.category}
                                        handleCategory={this.handleCategory}
                                    />
                                </li>

                                <li class="nav-link">
                                    <a
                                        className="link"
                                        onClick={(e) => {
                                            this.handleClick(e);
                                        }}
                                        id="contact"
                                    >
                                        Contact Us
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div id="icons">
                            <SearchIcon
                                id="search-icon-header"
                                onClick={() => {
                                    this.toggleSearch();
                                }}
                            />
                            {localStorage.getItem("authenticated") ? (
                                <div
                                    className="profile-dropdown"
                                    id="profile-dropdown"
                                >
                                    <IconButton
                                        aria-label="cart"
                                        onClick={() => {
                                            this.props.history.push("/cart");
                                        }}
                                        id="cart-icon"
                                    >
                                        <StyledBadge
                                            badgeContent={
                                                this.props.cart
                                                    ? this.props.cart
                                                    : localStorage.getItem(
                                                          "cart"
                                                      )
                                            }
                                            color="secondary"
                                        >
                                            <ShoppingCartOutlinedIcon id="cart" />
                                        </StyledBadge>
                                    </IconButton>
                                    <Avatar
                                        id="avatar"
                                        onClick={() => {
                                            this.toggleProfile();
                                        }}
                                    >
                                        {localStorage
                                            .getItem("name")[0]
                                            .toUpperCase()}
                                    </Avatar>
                                    <div
                                        className="profile-dropdown-content"
                                        id="profile-dropdown-content"
                                    >
                                        <div>
                                            <h5
                                                style={{
                                                    color: "#cc2129",
                                                }}
                                            >
                                                <i
                                                    class="fa fa-user-circle-o"
                                                    aria-hidden="true"
                                                ></i>
                                                &nbsp;
                                                {localStorage.getItem("name")}
                                            </h5>
                                        </div>

                                        <div
                                            onClick={() => {
                                                this.props.history.push(
                                                    "/orders"
                                                );
                                            }}
                                        >
                                            <i
                                                class="fa fa-shopping-bag"
                                                aria-hidden="true"
                                            ></i>
                                            &nbsp;
                                            <h5> My Orders</h5>
                                        </div>

                                        <div
                                            onClick={() => {
                                                this.logout();
                                            }}
                                        >
                                            <i
                                                class="fa fa-sign-out"
                                                aria-hidden="true"
                                            ></i>
                                            &nbsp;
                                            <h5> Logout</h5>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <Button
                                    id="login"
                                    variant="outlined"
                                    onClick={() => {
                                        this.setState({ open: true });
                                    }}
                                >
                                    Login
                                </Button>
                            )}
                        </div>
                    </Navbar>
                </Container>

                <Sidebar
                    open={this.state.show}
                    handleMenu={this.handleMenu}
                    handleClick={this.handleClick}
                    handleOpen={() => {
                        this.setState({ open: true });
                    }}
                    loggedin={this.state.loggedin}
                    logout={() => {
                        this.setState({ loggedin: false });
                    }}
                />
                <Authenticate
                    open={this.props.open ? this.props.open : this.state.open}
                    handleModal={this.handleModal}
                    handleLogin={this.handleLogin}
                />
            </>
        );
    }
}

export default withRouter(Header);
