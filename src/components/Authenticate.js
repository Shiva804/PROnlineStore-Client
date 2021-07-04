import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import axios from "../config";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";
import CircularProgress from "@material-ui/core/CircularProgress";
import Terms from "./Terms";

export default class Login extends Component {
    state = {
        value: 0,
        tab: "login",
        email: null,
        password: null,
        name: null,
        error: null,
        success: null,
        loading: false,
        agreed: false,
        open: false,
    };

    handleChange = (event, newValue) => {
        this.setState({ value: newValue });
    };

    handleInput = (e) => {
        if (e.target.id == "email") this.setState({ email: e.target.value });
        if (e.target.id == "name") this.setState({ name: e.target.value });
        if (e.target.id == "password")
            this.setState({ password: e.target.value });
    };

    handleLogin = async (e) => {
        try {
            e.preventDefault();
            if (this.state.email && this.state.password) {
                const login = await axios.post(
                    "/login",
                    {
                        email: this.state.email,
                        password: this.state.password,
                    },
                    { withCredentials: true }
                );

                this.setState({ success: "Logged In Successfully" });
                setTimeout(() => {
                    this.setState({ success: null });
                    this.props.handleLogin(login.data);

                    this.props.handleModal();
                }, 2000);
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

    handleSignup = async (e) => {
        e.preventDefault();

        if (this.state.email && this.state.password && this.state.name) {
            if (this.state.agreed) {
                try {
                    this.setState({ loading: true });

                    await axios.post("/register", {
                        name: this.state.name,
                        email: this.state.email,
                        password: this.state.password,
                    });
                    this.setState({ loading: false });

                    this.setState({
                        success: `Confirmaion link sent to your mail ${this.state.email}! `,
                    });
                    setTimeout(() => {
                        this.setState({ success: null });
                    }, 12000);
                } catch (e) {
                    this.setState({ loading: false });
                    this.setState({ error: e.response.data });
                    setTimeout(() => {
                        this.setState({ error: null });
                    }, 3000);
                }
            } else {
                this.setState({
                    error: "Please agree to the terms and conditons!",
                });
                setTimeout(() => {
                    this.setState({ error: null });
                }, 3000);
            }
        } else {
            this.setState({ error: "Please fill all the fields" });
            setTimeout(() => {
                this.setState({ error: null });
            }, 3000);
        }
    };

    forgotPassword = async () => {
        try {
            if (this.state.email) {
                this.setState({ loading: true });

                await axios.get(`/reset?email=${this.state.email}`, {
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

    agree = (e) => {
        if (e.target.checked) {
            this.setState({ agreed: true });
        } else {
            this.setState({ agreed: false });
        }
    };

    render() {
        return (
            <>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={this.props.open}
                    onClose={this.props.handleModal}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={this.props.open}>
                        <div id="authenticate">
                            <Paper style={{ flexGrow: 1 }} id="paper">
                                <Tabs
                                    value={this.state.value}
                                    onChange={this.handleChange}
                                    indicatorColor="secondary"
                                    textColor="primary"
                                    centered
                                    id="tabs"
                                >
                                    <Tab
                                        id="tab"
                                        label="Login"
                                        onClick={() => {
                                            this.setState({
                                                tab: "login",
                                            });

                                            const inp =
                                                document.getElementsByTagName(
                                                    "input"
                                                );
                                            for (
                                                var i = 0, length = inp.length;
                                                i < length;
                                                i++
                                            ) {
                                                inp[i].value = "";
                                            }
                                        }}
                                    />
                                    <Tab
                                        id="tab"
                                        label="Sign Up"
                                        onClick={() => {
                                            this.setState({ tab: "signup" });
                                            const inp =
                                                document.getElementsByTagName(
                                                    "input"
                                                );
                                            for (
                                                var i = 0, length = inp.length;
                                                i < length;
                                                i++
                                            ) {
                                                inp[i].value = "";
                                            }
                                        }}
                                    />

                                    <CloseIcon
                                        id="close"
                                        onClick={this.props.handleModal}
                                    />
                                </Tabs>
                            </Paper>

                            {this.state.tab === "login" ? (
                                <div id="login-tab">
                                    <h3>
                                        Please enter your login credentials!
                                    </h3>
                                    <form>
                                        <div class="form-group">
                                            <label
                                                for="exampleInputEmail1"
                                                id="label"
                                            >
                                                Email Address
                                            </label>
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
                                            <label
                                                for="exampleInputEmail1"
                                                id="label"
                                            >
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                class="form-control"
                                                placeholder="Password"
                                                id="password"
                                                onChange={(e) => {
                                                    this.handleInput(e);
                                                }}
                                            />
                                        </div>

                                        {this.state.error ? (
                                            <Alert severity="error" id="alert">
                                                {this.state.error}
                                            </Alert>
                                        ) : null}

                                        {this.state.success ? (
                                            <Alert
                                                severity="success"
                                                id="alert"
                                            >
                                                {this.state.success}
                                            </Alert>
                                        ) : null}
                                        <br />
                                        {this.state.loading ? (
                                            <CircularProgress />
                                        ) : null}
                                        <h6
                                            id="forgot"
                                            onClick={() => {
                                                this.forgotPassword();
                                            }}
                                        >
                                            Forgot Password?
                                        </h6>

                                        <button
                                            type="submit"
                                            class="btn btn-primary"
                                            id="submit"
                                            onClick={(e) => {
                                                this.handleLogin(e);
                                            }}
                                        >
                                            Login &nbsp;&nbsp;
                                            <ExitToAppIcon />
                                        </button>
                                    </form>
                                </div>
                            ) : (
                                <div id="login-tab">
                                    <h3>Welcome to PR Online Store!</h3>

                                    <form>
                                        <div class="form-group">
                                            <label
                                                for="exampleInputEmail1"
                                                id="label"
                                            >
                                                Username
                                            </label>
                                            <input
                                                type="text"
                                                class="form-control"
                                                id="name"
                                                placeholder="Enter name"
                                                onChange={(e) => {
                                                    this.handleInput(e);
                                                }}
                                            />
                                        </div>
                                        <div class="form-group">
                                            <label
                                                for="exampleInputEmail1"
                                                id="label"
                                            >
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                class="form-control"
                                                placeholder="Enter email"
                                                onChange={(e) => {
                                                    this.handleInput(e);
                                                }}
                                            />
                                        </div>
                                        <div class="form-group">
                                            <label
                                                for="exampleInputEmail1"
                                                id="label"
                                            >
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                id="password"
                                                class="form-control"
                                                placeholder="Password"
                                                onChange={(e) => {
                                                    this.handleInput(e);
                                                }}
                                            />
                                        </div>
                                        <div id="form-check">
                                            <input
                                                type="checkbox"
                                                class="form-check-input"
                                                id="check"
                                                checked={this.state.agreed}
                                                onChange={(e) => {
                                                    this.agree(e);
                                                }}
                                            />
                                            <p
                                                onClick={() => {
                                                    this.setState({
                                                        open: true,
                                                    });
                                                }}
                                            >
                                                I agree to the Terms and Return
                                                Policies.
                                            </p>
                                        </div>

                                        <br />
                                        {this.state.error ? (
                                            <Alert severity="error" id="alert">
                                                {this.state.error}
                                            </Alert>
                                        ) : null}
                                        {this.state.success ? (
                                            <Alert
                                                severity="success"
                                                id="alert"
                                            >
                                                {this.state.success}
                                            </Alert>
                                        ) : null}
                                        <button
                                            type="submit"
                                            class="btn btn-primary"
                                            id="submit"
                                            onClick={(e) => {
                                                this.handleSignup(e);
                                            }}
                                        >
                                            Sign Up &nbsp;&nbsp;
                                            <ExitToAppIcon />
                                        </button>
                                    </form>
                                </div>
                            )}
                        </div>
                    </Fade>
                </Modal>
                {this.state.open ? (
                    <Terms
                        open={this.state.open}
                        handleClose={() => {
                            this.setState({ open: false });
                        }}
                    />
                ) : null}
            </>
        );
    }
}
