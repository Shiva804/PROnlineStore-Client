import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function TransitionsModal(props) {
    const classes = useStyles();

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={props.open}
                onClose={props.handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={true}>
                    <div className={classes.paper} id="tncmodal">
                        <h5>TERMS AND CONDITIONS</h5>
                        <div>
                            <ul>
                                <li>
                                    <b>Free delivery</b> for all orders.
                                </li>
                                <li>
                                    Purchases are shipped by reputed courier
                                    agencies. <br />
                                    Please allow the following number of days
                                    from receipt of your order.
                                </li>
                                <li>
                                    <b>For orders within India </b> – All orders
                                    will be delivered within <b>2-3 weeks</b>.
                                </li>
                                <li>
                                    For International orders – All international
                                    orders will be processed and delivered
                                    within 3-4 weeks.
                                </li>
                            </ul>
                        </div>
                        <h5>RETURNS & REFUNDS POLICY</h5>
                        <div>
                            <ul>
                                <li>
                                    At PR Online Store, we strive to give you
                                    the very best shopping experience possible.
                                    <br />
                                    However, considering that , we cannot accept
                                    exchange or return of used products once
                                    sold or delivered.
                                </li>
                                <li>
                                    PR ONLINE STORE is not responsible for any
                                    damage caused after delivery.
                                </li>
                                <li>
                                    In case the product is received in a damaged
                                    (broken or any other) condition, refund or
                                    replacement will take place only if informed
                                    within 24 hours with video proof of
                                    unboxing, from the time of delivery.
                                </li>
                                <li>
                                    Returns and exchange requests will be
                                    subject to checking and vetting by PR ONLINE
                                    STORE.
                                </li>
                                <br />
                                <span
                                    style={{
                                        color: "brown",
                                        textDecoration: "underline",
                                    }}
                                >
                                    Contact Us
                                </span>
                                &nbsp; info@pronlinestore.com (For shipment and
                                other related queries).
                            </ul>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
