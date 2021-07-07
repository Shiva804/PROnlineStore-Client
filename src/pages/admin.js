import React, { Component } from "react";
import axios from "../config";
import AdminComponent from "../components/Admin";
import Alert from "@material-ui/lab/Alert";

export default class Admin extends Component {
    state = {
        email: null,
        password: null,
        auth: sessionStorage.getItem("auth")
            ? sessionStorage.getItem("auth")
            : false,
        orders: [],
        products: [],
        error: null,
        success: null,
    };
    componentDidMount = async () => {
        document.getElementById("search-main-mobile").style.display = "none";

        if (sessionStorage.getItem("auth")) {
            try {
                const admindata = await axios.get("/admindata", {
                    withCredentials: true,
                });
                this.setState({ orders: admindata.data.cart });
                this.setState({ products: admindata.data.products });
            } catch (e) {
                sessionStorage.clear();
                this.props.logout();
            }
        }
    };

    handleInput = (e) => {
        if (e.target.id == "email") this.setState({ email: e.target.value });
        if (e.target.id == "password")
            this.setState({ password: e.target.value });
    };
    forgotPassword = async (e) => {
        try {
            if (this.state.email) {
                this.setState({ loading: true });

                await axios.get(`/adminreset?email=${this.state.email}`, {
                    withCredentials: true,
                });
                this.setState({ loading: false });
                this.setState({
                    success: `Password reset link has been sent to your mail ${this.state.email} `,
                });
                setTimeout(() => {
                    this.setState({ success: null });
                }, 12000);
            } else {
                this.setState({ error: "Please enter your email" });
                setTimeout(() => {
                    this.setState({ error: null });
                }, 3000);
            }
        } catch (e) {
            this.setState({ loading: false });

            this.setState({ error: e.response.data });
            setTimeout(() => {
                this.setState({ error: null });
            }, 3000);
        }
    };

    handleLogin = async (e) => {
        try {
            e.preventDefault();
            if (this.state.email && this.state.password) {
                const login = await axios.post(
                    "/adminLogin",
                    {
                        email: this.state.email,
                        password: this.state.password,
                    },
                    {
                        withCredentials: true,
                    }
                );
                this.setState({ orders: login.data.cart });
                this.setState({ products: login.data.products });

                sessionStorage.setItem("auth", true);
                this.setState({ auth: true });
            } else {
                this.setState({ error: "Please fill all the fields" });
                setTimeout(() => {
                    this.setState({ error: null });
                }, 3000);
            }
        } catch (e) {
            this.setState({ error: e.response.data });
            setTimeout(() => {
                this.setState({ error: null });
            }, 3000);
        }
    };
    render() {
        return (
            <div id="admin">
                {this.state.auth ? (
                    <AdminComponent
                        orders={this.state.orders}
                        products={this.state.products}
                        logout={() => {
                            this.setState({ auth: false });
                        }}
                    />
                ) : (
                    <div id="admin-login">
                        <h3>PR ONLINE STORE</h3>
                        <h5>ADMIN LOGIN</h5>
                        <form>
                            <div class="form-group">
                                <input
                                    type="email"
                                    class="form-control"
                                    id="email"
                                    placeholder="Enter email"
                                    onChange={(e) => {
                                        this.handleInput(e);
                                    }}
                                />
                            </div>
                            <div class="form-group">
                                <input
                                    type="password"
                                    class="form-control"
                                    id="password"
                                    placeholder="Enter password"
                                    onChange={(e) => {
                                        this.handleInput(e);
                                    }}
                                />
                            </div>
                            <br></br>
                            <h6
                                id="forgot"
                                onClick={() => {
                                    this.forgotPassword();
                                }}
                            >
                                Forgot Password?
                            </h6>
                            {this.state.error ? (
                                <Alert severity="error" id="alert">
                                    {this.state.error}
                                </Alert>
                            ) : null}

                            {this.state.success ? (
                                <Alert severity="success" id="alert">
                                    {this.state.success}
                                </Alert>
                            ) : null}

                            <button
                                id="admin-login-btn"
                                onClick={(e) => {
                                    this.handleLogin(e);
                                }}
                            >
                                LOGIN
                            </button>
                        </form>
                    </div>
                )}
            </div>
        );
    }
}
