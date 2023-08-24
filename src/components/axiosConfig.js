import axios from "axios";
import { URL_SERVER } from "../contexts/constantesVar";

const axiosConfigs = axios.create({
    baseURL:URL_SERVER,
    headers: {
        "x-access-token":window.localStorage.getItem("token")
    },
});


export default axiosConfigs