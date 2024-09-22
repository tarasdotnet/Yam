import axios from "axios";
import { PATHS } from "../Config/Paths";

export default class HttpService {
    static async get(url, authHeader = null) {
        const response = await axios.get(`${PATHS.api}${url}`
            ,{
            headers: {
                'Authorization': authHeader
            }
        }
    ).catch(error => {
            console.log(error);
          });
        return response;
    }

    static async post(url, data) {
        const response = await axios.post(`${PATHS.api}${url}`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).catch(error => {
            console.log('POST request error:', error);
            return error.response;
        });
        return response;
    }
}
