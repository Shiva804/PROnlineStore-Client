import axios from "axios";

const instance = axios.create({
    baseURL: "https://server.pronlinestore.com/",
});

export default instance;
