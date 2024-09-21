import axios from "axios";
import { PATHS } from "../Config/Paths";

export default class AuthService {
    static async postLogIn(logInModel) {
        const response = await axios.post(PATHS.api + PATHS.User + PATHS.LogIn, logInModel, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).catch(error => {
            console.log('Log in error:', error);
            return error.response;
        });
        return response;
    }

    static async postSignUp(signUpModel) {
        const response = await axios.post(PATHS.api + PATHS.User + PATHS.SignUp, signUpModel, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).catch(error => {
            console.log('Sign up error:', error);
            return error.response;
        });
        return response;
    }
}