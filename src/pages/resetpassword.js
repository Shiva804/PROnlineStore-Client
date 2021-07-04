import React, { Component } from "react";
import Notfound from ".//notfound";
import RotateLeftRoundedIcon from "@material-ui/icons/RotateLeftRounded";
import Alert from "@material-ui/lab/Alert";
import axios from "../config";
import { withRouter } from "react-router";
import Header from "../components/Header";

class Resetpassword extends Component {
    state = {
        auth: false,
        newpassword: null,
        confirmpassword: null,
        error: null,
        success: null,
    };
    componentDidMount = async () => {
        try {
            const { token } = this.props.match.params;
            await axios.get(`/verifyreset?token=${token}`, {
                withCredentials: true,
            });

            this.setState({ auth: true });
        } catch (e) {
            this.setState({ auth: false });
        }
    };

    handleInput = (e) => {
        if (e.target.id == "new-password")
            this.setState({ newpassword: e.target.value });

        if (e.target.id == "confirm-password")
            this.setState({ confirmpassword: e.target.value });
    };
    handleReset = async () => {
        const { email } = this.props.match.params;

        if (this.state.newpassword === this.state.confirmpassword) {
            try {
                const update = await axios.post(
                    "/updateuser",
                    {
                        email: email,
                        password: this.state.newpassword,
                    },
                    {
                        withCredentials: true,
                    }
                );

                this.setState({
                    success: `Password resetted successfully`,
                });
                setTimeout(() => {
                    this.setState({ success: null });
                    localStorage.clear();
                    if (update.data.role == "admin") {
                        this.props.history.push("/admin");
                    } else {
                        this.props.history.push("/");
                    }
                }, 3000);
            } catch (e) {
                this.setState({ error: e.response.data });
                setTimeout(() => {
                    this.setState({ error: null });
                }, 3000);
            }
        } else {
            this.setState({ error: "Password Mismatch" });
            setTimeout(() => {
                this.setState({ error: null });
            }, 3000);
        }
    };

    render() {
        return (
            <div>
                <Header />
                {this.state.auth ? (
                    <div id="resetpassword">
                        <h3>Reset Your Password</h3>
                        <div class="form-group">
                            <input
                                type="password"
                                class="form-control"
                                placeholder="New Password"
                                id="new-password"
                                onChange={(e) => {
                                    this.handleInput(e);
                                }}
                            />
                        </div>
                        <div class="form-group">
                            <input
                                type="password"
                                class="form-control"
                                placeholder="Confirm Password"
                                id="confirm-password"
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
                            <Alert severity="success" id="alert">
                                {this.state.success}
                            </Alert>
                        ) : null}
                        <br />
                        <br />
                        <button
                            type="submit"
                            class="btn btn-primary"
                            id="reset"
                            onClick={() => {
                                this.handleReset();
                            }}
                        >
                            Reset Password&nbsp;&nbsp;
                            <RotateLeftRoundedIcon />
                        </button>
                    </div>
                ) : (
                    <Notfound />
                )}
            </div>
        );
    }
}

export default withRouter(Resetpassword);
