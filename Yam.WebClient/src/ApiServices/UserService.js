import { PATHS } from "../Config/Paths";
import HttpService from "./HttpService";

export default class UserService {
    static async postLogIn(logInModel) {
        return HttpService.post(`${PATHS.User}${PATHS.LogIn}`, logInModel);
    }

    static async postSignUp(signUpModel) {
        return HttpService.post(`${PATHS.User}${PATHS.SignUp}`, signUpModel);
    }

    static async getUserProfileDataById(id, authHeader) {
        return HttpService.get(`${PATHS.User}${PATHS.Profile}/${id}`, authHeader);
    }
}