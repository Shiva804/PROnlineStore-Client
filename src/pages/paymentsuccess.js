import React, { Component } from "react";
import { withRouter } from "react-router";
import logo from "../images/download.png";

class Paymentsuccess extends Component {
    componentDidMount = async () => {
        const { order_id } = this.props.match.params;

        if (order_id !== sessionStorage.getItem("order_id"))
            this.props.history.push("/");
    };

    render() {
        return (
            <div id="paymentsuccess">
                <div id="success-logo">
                    <img src={logo} />
                    PR Online Store
                </div>
                <div id="paymentsuccess-div">
                    <h4>Thanks for shopping with us.</h4>
                    <br />
                    <h4>Your order has been confirmed!</h4>
                    <h5>Confirmation has been sent to your email.</h5>
                    <br />
                    <h5>Expected delivery: 2 to 3 Weeks</h5>
                    <br />
                    <button
                        id="proceed-orderspage"
                        onClick={() => {
                            sessionStorage.removeItem("order_id");
                            localStorage.removeItem("cart");
                            this.props.history.push("/orders");
                        }}
                    >
                        Proceed to My Orders page!
                    </button>
                </div>
            </div>
        );
    }
}

export default withRouter(Paymentsuccess);
