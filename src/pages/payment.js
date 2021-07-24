import React, { Component } from "react";
import axios from "../config";
import logo from "../images/download.png";
import { withRouter } from "react-router";

class Payment extends Component {
    state = {
        error: null,
    };
    displayRazorpay = async () => {
        const { order_id } = this.props.match.params;

        const order = await axios.get(`/orderid/${order_id}`, {
            withCredentials: true,
        });

        let razor_key;
        if (process.env.REACT_APP_ENV == "development") {
            razor_key = process.env.REACT_APP_DEV_KEY_ID;
        } else {
            razor_key = process.env.REACT_APP_PROD_KEY_ID;
        }

        var options = {
            key: razor_key, // Enter the Key ID generated from the Dashboard
            order_id: order.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            amount: order.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: order.data.currency,
            name: "PR Online Store",
            description: "",
            image: logo,
            handler: () => {
                this.props.history.push(
                    `/paymentsuccess/${sessionStorage.getItem("order_id")}`
                );
            },
            prefill: {
                name: localStorage.getItem("name"),
                email: localStorage.getItem("email"),
                contact: order.data.notes.contact_number,
            },
            notify: {
                email: true,
            },
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.on("payment.failed", (response) => {
            this.setState({ error: response.error.description });
        });

        rzp1.on("payment.cancelled", (response) => {
            console.log("Payment Failed!");
        });

        rzp1.open();
    };

    componentDidMount = async () => {
        const { order_id } = this.props.match.params;
        if (order_id == sessionStorage.getItem("order_id")) {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            document.body.appendChild(script);
            script.onload = this.displayRazorpay();
        }
    };

    render() {
        return (
            <div>
                {this.state.error ? (
                    <div>
                        <h3>{this.state.error}</h3>
                        <button
                            onClick={() => {
                                this.props.history.push("/cart");
                            }}
                        >
                            Go back to Cart!
                        </button>
                    </div>
                ) : null}
            </div>
        );
    }
}
export default withRouter(Payment);
