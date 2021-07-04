import React, { Component } from "react";
import { Container } from "react-bootstrap";
import Header from "../components/Header";
import axios from "../config";
import Alert from "@material-ui/lab/Alert";

export default class Address extends Component {
    state = {
        error: null,
    };

    componentDidMount = () => {
        const { id } = this.props.match.params;
        if (sessionStorage.getItem("id") != id) {
            this.props.history.push("/cart");
        }
    };

    handleChange = (e) => {
        let newState = {};

        newState[e.target.id] = e.target.value;
        this.setState(newState);
    };

    formSubmit = async (e) => {
        e.preventDefault();
        try {
            if (this.state && Object.keys(this.state).length >= 9) {
                const cartproducts = await axios.get(
                    `/cart/${localStorage.getItem("email")}`,
                    { withCredentials: true }
                );

                const razor_response = await axios.post("/razorpay", {
                    amount: cartproducts.data.subtotal,
                    email: localStorage.getItem("email"),
                    address: this.state,
                });
                sessionStorage.setItem("order_id", razor_response.data.id);

                this.props.history.push(`/payment/${razor_response.data.id}`);
            } else {
                this.setState({
                    error: "Please fill all the required fields!",
                });
                setTimeout(() => {
                    this.setState({ error: null });
                }, 3000);
            }
        } catch (e) {
            this.setState({ error: "Error Occured!" });
            setTimeout(() => {
                this.setState({ error: null });
            }, 3000);
        }
    };

    render() {
        return (
            <div id="addresspage">
                <Header />

                <Container id="address">
                    <div class="container">
                        <div class="row">
                            <div class="col-xs-12">
                                <form class="form-horizontal" role="form">
                                    <h2>Shipping Address</h2>

                                    <div class="form-group">
                                        <label
                                            for="name"
                                            class="col-sm-2 control-label"
                                        >
                                            Full Name&nbsp;<sup>*</sup>
                                        </label>
                                        <div class="col-sm-10">
                                            <input
                                                type="text"
                                                class="form-control"
                                                id="name"
                                                name="full-name"
                                                placeholder="Full Name"
                                                required
                                                onChange={(e) => {
                                                    this.handleChange(e);
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label
                                            for="contact_number"
                                            class="col-sm-2 control-label"
                                        >
                                            Contact Number&nbsp;<sup>*</sup>
                                        </label>
                                        <div class="col-sm-10">
                                            <input
                                                type="number"
                                                class="form-control"
                                                id="contact_number"
                                                name="contact-number"
                                                placeholder="Contact Number"
                                                required
                                                onChange={(e) => {
                                                    this.handleChange(e);
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <p class="col-sm-offset-2 col-sm-10 help-block">
                                            Street address, P.O. box, company
                                            name, c/o
                                        </p>
                                        <label
                                            for="address_line_1"
                                            class="col-sm-2 control-label"
                                        >
                                            Address Line 1&nbsp;<sup>*</sup>
                                        </label>
                                        <div class="col-sm-10">
                                            <input
                                                type="text"
                                                class="form-control"
                                                id="address_line_1"
                                                name="address-line1"
                                                placeholder="Address Line 1"
                                                onChange={(e) => {
                                                    this.handleChange(e);
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <p class="col-sm-offset-2 col-sm-10 help-block">
                                            Apartment, suite , unit, building,
                                            floor, etc.
                                        </p>
                                        <label
                                            for="address_line_2"
                                            class="col-sm-2 control-label"
                                        >
                                            Address Line 2&nbsp;<sup>*</sup>
                                        </label>
                                        <div class="col-sm-10">
                                            <input
                                                type="text"
                                                class="form-control"
                                                id="address_line_2"
                                                name="address-line2"
                                                placeholder="Address Line 2"
                                                onChange={(e) => {
                                                    this.handleChange(e);
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label
                                            for="city"
                                            class="col-sm-2 control-label"
                                        >
                                            City/Town&nbsp;<sup>*</sup>
                                        </label>
                                        <div class="col-sm-10">
                                            <input
                                                type="text"
                                                class="form-control"
                                                id="city"
                                                name="city-town"
                                                placeholder="City / Town"
                                                onChange={(e) => {
                                                    this.handleChange(e);
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label
                                            for="state"
                                            class="col-sm-2 control-label"
                                        >
                                            State/Province/Region&nbsp;
                                            <sup>*</sup>
                                        </label>
                                        <div class="col-sm-10">
                                            <input
                                                type="text"
                                                class="form-control"
                                                id="state"
                                                name="state-province-region"
                                                placeholder="State / Province / Region"
                                                onChange={(e) => {
                                                    this.handleChange(e);
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label
                                            for="zip"
                                            class="col-sm-2 control-label"
                                        >
                                            Zip/Postal Code&nbsp;<sup>*</sup>
                                        </label>
                                        <div class="col-sm-10">
                                            <input
                                                type="number"
                                                class="form-control"
                                                id="zip"
                                                name="zip-postal-code"
                                                placeholder="Zip / Postal Code"
                                                onChange={(e) => {
                                                    this.handleChange(e);
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label
                                            for="country"
                                            class="col-sm-2 control-label"
                                        >
                                            Country&nbsp;<sup>*</sup>
                                        </label>
                                        <div class="col-sm-10">
                                            <input
                                                type="text"
                                                class="form-control"
                                                id="country"
                                                name="country"
                                                placeholder="Country"
                                                onChange={(e) => {
                                                    this.handleChange(e);
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <br />
                                    {this.state.error ? (
                                        <Alert severity="error" id="alert">
                                            {this.state.error}
                                        </Alert>
                                    ) : null}
                                    <br />

                                    <div id="paydiv">
                                        <button
                                            type="submit"
                                            id="pay"
                                            onClick={(e) => {
                                                this.formSubmit(e);
                                            }}
                                        >
                                            PROCEED TO PAY
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
}
