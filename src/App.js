import React, { Component } from "react";
// import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./pages/home";
import About from "./pages/about";
import Product from "./pages/product";
import Contact from "./pages/contact";
import Search from "./components/Search";
import SearchResult from "./pages/searchresult";
import Scroll from "./components/ScrollToTop";
import Resetpassword from "./pages/resetpassword";
import Notfound from "./pages/notfound";
import Cart from "./pages/cart";
import Payment from "./pages/payment";
import Myorders from "./pages/myorders";
import Address from "./pages/address";
import Admin from "./pages/admin";
import Paymentsuccess from "./pages/paymentsuccess";

import axios from "./config";
import AOS from "aos";
import "aos/dist/aos.css";

export default class App extends Component {
    state = {
        loggedin: localStorage.getItem("authenticated")
            ? localStorage.getItem("authenticated")
            : false,
    };

    componentDidMount = async () => {
        AOS.init({
            duration: 1000,
            startEvent: "DOMContentLoaded",
        });

        if (localStorage.getItem("authenticated")) {
            try {
                const validate = await axios.get("/validateuser", {
                    withCredentials: true,
                });
                localStorage.setItem("cart", validate.data.cart);
                localStorage.setItem("authenticated", true);
                localStorage.setItem("name", validate.data.name);
                localStorage.setItem("email", validate.data.email);
                this.setState({ loggedin: true });
            } catch (e) {
                this.setState({ loggedin: false });
                localStorage.clear();
                console.log(e);
            }
        }
    };
    render() {
        return (
            <div id="app">
                <Router>
                    <div id="routing-container">
                        <Search handleSearch={this.handleSearch} />
                        <Scroll showBelow={100} />

                        <Switch>
                            <Route
                                path="/"
                                exact={true}
                                component={(props) => (
                                    <Home
                                        {...props}
                                        loggedin={this.state.loggedin}
                                    />
                                )}
                            />
                            <Route
                                path="/about"
                                exact={true}
                                component={(props) => <About {...props} />}
                            />
                            <Route
                                path="/search"
                                exact={true}
                                component={(props) => (
                                    <SearchResult {...props} />
                                )}
                            />
                            <Route
                                path="/product/:category"
                                component={(props) => (
                                    <Product
                                        {...props}
                                        cartHandler={this.cartHandler}
                                    />
                                )}
                            />
                            <Route
                                path="/contact"
                                exact={true}
                                component={(props) => <Contact {...props} />}
                            />

                            <Route
                                path="/resetpassword/:token/:email"
                                component={(props) => (
                                    <Resetpassword {...props} />
                                )}
                            />

                            <Route
                                path="/cart"
                                component={(props) => <Cart {...props} />}
                            />

                            <Route
                                path="/payment/:order_id"
                                component={(props) => <Payment {...props} />}
                            />
                            <Route
                                path="/paymentsuccess/:order_id"
                                component={(props) => (
                                    <Paymentsuccess {...props} />
                                )}
                            />

                            <Route
                                path="/orders"
                                component={(props) => <Myorders {...props} />}
                            />
                            <Route
                                path="/address/:id"
                                component={(props) => <Address {...props} />}
                            />
                            <Route
                                path="/admin"
                                exact={true}
                                component={(props) => <Admin {...props} />}
                            />

                            <Route path="*" component={() => <Notfound />} />
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}
