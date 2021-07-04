import React, { Component } from "react";
import SearchIcon from "@material-ui/icons/Search";
import Fuse from "fuse.js";
import axios from "../config";
import { withRouter } from "react-router";

class Search extends Component {
    state = {
        allProducts: [],
    };
    componentDidMount = async () => {
        const allProducts = await axios.get("/allproducts");
        this.setState({ allProducts: allProducts.data });
    };
    search = (value) => {
        const options = {
            keys: ["name", "category"],
            shouldSort: true,
            threshold: 0.3,
        };

        const fuse = new Fuse(this.state.allProducts, options);

        const result = fuse.search(value);
        localStorage.setItem("searchfor", value);
        localStorage.setItem("result", JSON.stringify(result));
        this.props.history.push("/search");
    };

    render() {
        return (
            <div>
                <div id="search-bg">
                    <div
                        class="input-group rounded"
                        id="search-main"
                        name="search-main"
                    >
                        <input
                            type="search"
                            id="search"
                            class="form-control rounded"
                            placeholder="Search"
                            aria-label="Search"
                            aria-describedby="search-addon"
                            onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    this.search(e.target.value);
                                }
                            }}
                        />
                        <span
                            class="input-group-text border-0"
                            id="search-addon"
                        >
                            <SearchIcon
                                onClick={() => {
                                    const value =
                                        document.getElementById("search").value;
                                    this.search(value);
                                }}
                            />
                        </span>
                    </div>
                </div>
                <div class="input-group rounded" id="search-main-mobile">
                    <input
                        type="search"
                        id="search-mobile"
                        class="form-control rounded"
                        placeholder="Search"
                        aria-label="Search"
                        aria-describedby="search-addon"
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                this.search(e.target.value);
                            }
                        }}
                    />
                    <span
                        class="input-group-text border-0"
                        id="search-addon-mobile"
                    >
                        <SearchIcon
                            onClick={() => {
                                const value =
                                    document.getElementById(
                                        "search-mobile"
                                    ).value;
                                this.search(value);
                            }}
                        />
                    </span>
                </div>
            </div>
        );
    }
}

export default withRouter(Search);
