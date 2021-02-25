/* eslint-disable */
import * as base from "./base";
import * as Cookie from "js-cookie";
export class Login implements base.serverFunctions {
    login_id: string | number = "";
    password: string = "";

    constructor(json: any) {
        if (json) {
            this.login_id = json.login_id;
            this.password = json.password;
        }
    }

    getCreateObject = () => {
        return JSON.stringify({
            "login_id": this.login_id,
            "password": this.password,
        })
    }

    getEditObject = () => {
        return JSON.stringify({
            "login_id": this.login_id,
            "password": this.password,
        })
    }

    validate(): string[] {
        let errors: string[] = [];

        if (this.login_id === "")
            errors.push("Email cannot be empty");
        if (this.password.length === 0)
            errors.push("Password cannot be empty");
        return errors;
    }
}
export const isLoggedin = (): boolean => {
    let token = base.getToken();
    if (token === null) return false;
    if (token.length === 0) return false;
    return true;
};

export const login = async (
    t_c: boolean,
    manager: Login,
    successCallback: () => void,
    errorCallback: (msg: string[], status: number) => void,
    type: string
) => {
    const response = await base.postAPI(`auth/${type}?t_and_c=${t_c}`, manager.getCreateObject());
    let json = await response.json()
    if (!response.ok || response.status !== 200) {
        errorCallback(json.detail, response.status)
        return
    }
    let userType = "";
    let userCookieType = "";
    // Token will only be set for customer and not for vendor and superadmin
    if (json.user_type === "customer") {
        userType = json.user_type;
        userCookieType = json.user_type;
    } else if (json.user_type === "vendor") {
        userType = json.user_type;
        userCookieType = json.user_type;
    } else if (json.user_type === "superadmin") {
        userType = json.user_type;
        userCookieType = json.user_type;
    } else if (json.user_type === "customer_vendor") {
        userType = "customer";
        userCookieType = json.user_type;
    }
    // else if (isLoggedin() && json.user_type === "anonymous") {
    //     userType = json.user_type
    // }
    Cookie.set(base.token, json.access_token, <Cookie.CookieAttributes>base.cookieSettings);
    Cookie.set(base.refresh, json.refresh_token, <Cookie.CookieAttributes>base.cookieSettings);
    Cookie.set(base.userType, userCookieType, <Cookie.CookieAttributes>base.cookieSettings);
    const profileResponse = await base.getApi(`${userType}/profile`);
    let profilejson = await profileResponse.json();
    Cookie.set(base.customerName, profilejson.first_name + " " + profilejson.last_name, <Cookie.CookieAttributes>base.cookieSettings);
    successCallback();
}