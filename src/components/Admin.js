import axios from "../config";
import React, { Component } from "react";
import ImageUploading from "react-images-uploading";
export default class Admin extends Component {
    state = {
        data: [],
        head: [],
        selected: "orders",
        images: [],
        a_category: "Workstation",
        error: null,
        description: null,
        a_subcategory: null,
        success: null,
        changeprice: null,
    };

    componentDidMount = async () => {
        try {
            await axios.get("/validateadmin", { withCredentials: true });

            const admindata = await axios.get("/admindata", {
                withCredentials: true,
            });

            this.setState({ data: admindata.data.cart });
        } catch (e) {
            sessionStorage.clear();
            this.props.logout();
        }
    };

    delivered = async (index) => {
        const data = this.state.data;
        data[index].delivered = true;
        this.setState({ data: data });

        await axios.post(
            "/deliver",
            {
                product_name: data[index].product_name,
                order_id: data[index].order_id,
            },
            { withCredentials: true }
        );
    };

    handleSelection = async (e) => {
        if (e.target.id == "a-orders") {
            this.setState({ data: this.props.orders });
            this.setState({ selected: "orders" });
        }
        if (e.target.id == "a-products") {
            this.setState({ data: this.props.products });
            this.setState({ selected: "products" });
        }

        if (e.target.id == "a-addproduct") {
            this.setState({ selected: "addproduct" });
        }
    };

    logout = async () => {
        sessionStorage.clear();
        await axios.post("/adminlogout", {}, { withCredentials: true });
        this.props.logout();
    };

    addProduct = async () => {
        try {
            if (
                this.state.product_name &&
                this.state.product_price &&
                this.state.a_category &&
                this.state.images[0].data_url
            ) {
                const price = this.state.product_price.replaceAll(",", "");
                const product_body = {
                    name: this.state.product_name,
                    price: parseInt(price).toLocaleString("en-US"),
                    description: this.state.description,
                    category: this.state.a_category,
                    sub_category: this.state.a_subcategory,
                    image_src: this.state.images[0].data_url,
                };

                await axios.post("/addproduct", product_body, {
                    withCredentials: true,
                });
                this.setState({ success: "Product added!" });
                setTimeout(() => {
                    this.setState({ success: null });
                    window.location.reload();
                }, 3000);
            } else {
                this.setState({ error: "Please fill the mandatory fields!" });
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

    handleInput = async (e) => {
        let newState = {};
        newState[e.target.id] = e.target.value;
        this.setState(newState);
    };

    imageUpload = async (imageList, addUpdateIndex) => {
        this.setState({ images: imageList });
    };

    showInput = async (name, price) => {
        this.setState({ changeprice: price.replaceAll(",") });
        document.getElementById(`input-${name}`).style.display = "block";
        document.getElementById(`edit-${name}`).style.display = "none";
        document.getElementById(`change-${name}`).style.display = "block";
    };

    changePrice = async (name) => {
        const change_price = await axios.post(
            "/updateprice",
            {
                name: name,
                price: parseInt(
                    this.state.changeprice.replaceAll(",", "")
                ).toLocaleString("en-US"),
            },
            {
                withCredentials: true,
            }
        );

        this.setState({ data: change_price.data });

        document.getElementById(`input-${name}`).style.display = "none";
        document.getElementById(`edit-${name}`).style.display = "block";
        document.getElementById(`change-${name}`).style.display = "none";
    };

    render() {
        return (
            <div id="a-page">
                <div id="a-sidebar">
                    <ul>
                        <li
                            onClick={(e) => this.handleSelection(e)}
                            id="a-orders"
                        >
                            Orders Received
                        </li>
                        <li
                            onClick={(e) => this.handleSelection(e)}
                            id="a-products"
                        >
                            Products in store
                        </li>

                        <li
                            onClick={(e) => this.handleSelection(e)}
                            id="a-addproduct"
                        >
                            Add a product
                        </li>
                    </ul>

                    <button
                        id="a-logout"
                        onClick={() => {
                            this.logout();
                        }}
                    >
                        <i class="fa fa-user" aria-hidden="true"></i>
                        &nbsp;LOGOUT
                    </button>
                </div>

                <div id="a-main">
                    <div id="a-main-content">
                        <h3>ADMIN PAGE</h3>
                        <div id="admin-table">
                            {this.state.selected == "orders" ? (
                                <div>
                                    <h2>ORDERS RECEIVED</h2>
                                    <table
                                        id={this.state.selected}
                                        className="a-table"
                                    >
                                        <tr>
                                            <th>Email</th>
                                            <th>Product Name</th>
                                            <th>Quantity</th>
                                            <th>Order ID</th>
                                            <th>Payment ID</th>
                                            <th>Shipping Address</th>
                                            <th>Purchased Date</th>
                                            <th>Delivered</th>
                                        </tr>
                                        {this.state.data.map((data, i) => (
                                            <tr>
                                                <td>{data.email}</td>
                                                <td>
                                                    <b>{data.product_name}</b>
                                                </td>
                                                <td>{data.quantity}</td>
                                                <td>{data.order_id}</td>
                                                <td>{data.payment_id}</td>

                                                <td>{data.shipping_address}</td>
                                                <td>{data.purchased_date}</td>
                                                {data.delivered == false ? (
                                                    <td>
                                                        <button
                                                            id="not-delivered"
                                                            onClick={() => {
                                                                this.delivered(
                                                                    i
                                                                );
                                                            }}
                                                        >
                                                            Delivered &nbsp;
                                                            <i
                                                                class="fa fa-question"
                                                                aria-hidden="true"
                                                            ></i>
                                                        </button>
                                                    </td>
                                                ) : (
                                                    <td>
                                                        <button
                                                            id="delivered"
                                                            disabled
                                                        >
                                                            Delivered &nbsp;
                                                            <i
                                                                class="fa fa-check"
                                                                aria-hidden="true"
                                                            ></i>
                                                        </button>
                                                    </td>
                                                )}
                                            </tr>
                                        ))}
                                    </table>
                                </div>
                            ) : null}

                            {this.state.selected == "products" ? (
                                <div>
                                    <h2>PRODUCTS IN STORE</h2>
                                    <table
                                        id={this.state.selected}
                                        className="a-table"
                                    >
                                        <tr>
                                            <th>Product Name</th>
                                            <th>Description</th>
                                            <th>Price</th>
                                            <th>Selling Price</th>
                                            <th>Category</th>
                                            <th>Sub Category</th>
                                        </tr>
                                        {this.state.data.map((data) => (
                                            <tr>
                                                <td>
                                                    <b>{data.name}</b>
                                                </td>
                                                <td>{data.description}</td>
                                                <td style={{ display: "flex" }}>
                                                    Rs.{data.price}
                                                    <div
                                                        className="editprice"
                                                        id={`edit-${data.name}`}
                                                    >
                                                        <i
                                                            class="fa fa-pencil"
                                                            aria-hidden="true"
                                                            onClick={() => {
                                                                this.showInput(
                                                                    data.name,
                                                                    data.price
                                                                );
                                                            }}
                                                        ></i>
                                                    </div>
                                                    <br />
                                                    <input
                                                        id={`input-${data.name}`}
                                                        placeholder={data.price.toLocaleString(
                                                            "en-US"
                                                        )}
                                                        className="inputprice"
                                                        onChange={(e) => {
                                                            this.setState({
                                                                changeprice:
                                                                    e.target
                                                                        .value,
                                                            });
                                                        }}
                                                    />
                                                    <div
                                                        id={`change-${data.name}`}
                                                        className="changeprice"
                                                        onClick={() => {
                                                            this.changePrice(
                                                                data.name
                                                            );
                                                        }}
                                                    >
                                                        <i
                                                            class="fa fa-check"
                                                            aria-hidden="true"
                                                        ></i>
                                                    </div>
                                                </td>
                                                <td>
                                                    Rs.
                                                    {(
                                                        parseInt(
                                                            data.price.replaceAll(
                                                                ",",
                                                                ""
                                                            )
                                                        ) -
                                                        (parseInt(
                                                            data.price.replaceAll(
                                                                ",",
                                                                ""
                                                            )
                                                        ) *
                                                            25) /
                                                            100
                                                    ).toLocaleString("en-US")}
                                                </td>
                                                <td>{data.category}</td>
                                                <td>{data.sub_category}</td>
                                            </tr>
                                        ))}
                                    </table>
                                </div>
                            ) : null}

                            {this.state.selected == "addproduct" ? (
                                <div id="addproduct">
                                    <form>
                                        <div class="form-group">
                                            <label for="product-name">
                                                <b>
                                                    Product Name: <sup>*</sup>
                                                </b>
                                            </label>
                                            <input
                                                type="text"
                                                class="form-control"
                                                id="product_name"
                                                placeholder="Product Name"
                                                onChange={(e) => {
                                                    this.handleInput(e);
                                                }}
                                            />
                                        </div>
                                        <div class="form-group">
                                            <label for="description">
                                                <b>Description:</b>
                                            </label>
                                            <input
                                                type="text"
                                                class="form-control"
                                                id="description"
                                                placeholder="Description"
                                                onChange={(e) => {
                                                    this.handleInput(e);
                                                }}
                                            />
                                        </div>

                                        <div class="form-group">
                                            <label for="product-price">
                                                <b>
                                                    Price:<sup>*</sup>
                                                </b>
                                            </label>
                                            <input
                                                type="number"
                                                class="form-control"
                                                id="product_price"
                                                placeholder="Price"
                                                onChange={(e) => {
                                                    this.handleInput(e);
                                                }}
                                            />
                                            <p>
                                                Please enter the price
                                                <b> 25% </b>
                                                higher than the original price!
                                            </p>
                                        </div>
                                        <label for="a_category">
                                            <b>
                                                Category:<sup>*</sup>
                                            </b>
                                        </label>
                                        <select
                                            class="form-select"
                                            id="a_category"
                                            aria-label="Default select example"
                                            onChange={(e) => {
                                                this.handleInput(e);
                                            }}
                                        >
                                            <option
                                                selected
                                                value="Workstation"
                                            >
                                                Workstation
                                            </option>

                                            {[
                                                "Office Executive",
                                                "Multi Seater",
                                                "Dining Chair",
                                                "Lobby Chair",
                                                "Cafeteria",
                                                "Executive",
                                                "Tablet Chair",
                                                "Conference",
                                                "Bar stool",
                                                "Visitor",
                                                "Chair",
                                                "Director Chair",
                                                "Auditorum",
                                                "Hotel Furniture",
                                                "Garden Furniture",
                                                "Educational",
                                                "Furniture",
                                                "Fixed Chair",
                                                "Waiting",

                                                "Lounge",
                                            ].map((category) => (
                                                <option value={category}>
                                                    {category}
                                                </option>
                                            ))}
                                        </select>
                                        <br></br>
                                        <label for="a_category">
                                            <b>Sub Category:</b>
                                        </label>
                                        <select
                                            class="form-select"
                                            id="a_subcategory"
                                            aria-label="Default select example"
                                            onChange={(e) => {
                                                this.handleInput(e);
                                            }}
                                        >
                                            <option selected>
                                                Select Sub Category
                                            </option>

                                            {[
                                                "Cafeteria Chair",
                                                "Executive Chair",
                                                "Executive Set",
                                                "Office Executive Set",
                                                "Office Executive Tables",
                                                "Workstation Chair",
                                                "Workstation Set",
                                            ].map((subcategory) => (
                                                <option
                                                    value={subcategory}
                                                    key={subcategory}
                                                >
                                                    {subcategory}
                                                </option>
                                            ))}
                                        </select>
                                        <br></br>

                                        <label for="a_image">
                                            <b>
                                                Image:<sup>*</sup>
                                            </b>
                                        </label>
                                        <br></br>

                                        <ImageUploading
                                            multiple
                                            value={this.state.images}
                                            onChange={this.imageUpload}
                                            maxNumber={1}
                                            dataURLKey="data_url"
                                        >
                                            {({
                                                imageList,
                                                onImageUpload,
                                                onImageUpdate,
                                                onImageRemove,
                                                isDragging,
                                                dragProps,
                                            }) => (
                                                // write your building UI
                                                <div className="upload__image-wrapper">
                                                    <button
                                                        style={
                                                            isDragging
                                                                ? {
                                                                      color: "red",
                                                                  }
                                                                : undefined
                                                        }
                                                        onClick={onImageUpload}
                                                        {...dragProps}
                                                        className="image-upload"
                                                    >
                                                        Click or Drop here
                                                    </button>
                                                    &nbsp;
                                                    {imageList.map(
                                                        (image, index) => (
                                                            <div
                                                                key={index}
                                                                className="image-item"
                                                            >
                                                                <img
                                                                    src={
                                                                        image[
                                                                            "data_url"
                                                                        ]
                                                                    }
                                                                    alt=""
                                                                    width="200"
                                                                />
                                                                <div className="image-item__btn-wrapper">
                                                                    <button
                                                                        onClick={() =>
                                                                            onImageUpdate(
                                                                                index
                                                                            )
                                                                        }
                                                                        className="image-upload-update"
                                                                    >
                                                                        Update
                                                                    </button>
                                                                    <button
                                                                        onClick={() =>
                                                                            onImageRemove(
                                                                                index
                                                                            )
                                                                        }
                                                                        className="image-upload-remove"
                                                                    >
                                                                        Remove
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            )}
                                        </ImageUploading>
                                        <br></br>
                                        <br></br>

                                        {this.state.error ? (
                                            <p style={{ color: "brown" }}>
                                                {this.state.error}
                                            </p>
                                        ) : null}
                                        {this.state.success ? (
                                            <p style={{ color: "green" }}>
                                                {this.state.success}
                                            </p>
                                        ) : null}
                                        <button
                                            id="addproduct-btn"
                                            onClick={() => {
                                                this.addProduct();
                                            }}
                                        >
                                            Add Product
                                        </button>
                                    </form>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
