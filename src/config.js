import axios from "axios";

const instance = axios.create({
    baseURL: "https://server.pronlinestore.com/",
    // baseURL: "http://localhost:5000/",
});

export default instance;
