/* eslint-disable */
import * as base from "./base";
export class ForgotPassword implements base.serverFunctions {
    email: string = "";
    constructor(json: any) {
        if (json) {
            this.email = json.email;
        }
    }
    getCreateObject = () => {
        return JSON.stringify({
            "email": this.email,
        })
    }

    getEditObject = () => {
        return JSON.stringify({
            "email": this.email,
        })
    }
    validate(): string[] {
        let errors: string[] = [];

        if (this.email === "")
            errors.push("Email cannot be empty");
        return errors;
    }
}
export const forgotpassword = async (
    manager: ForgotPassword,
    successCallback: () => void,
    errorCallback: (status: number, msg: string[]) => void,
) => {
    const response = await base.postAPI(`auth/forgot_password`, manager.getCreateObject());
    let json = await response.json()
    if (!response.ok || response.status !== 200) {
        errorCallback(response.status, json.detail)
        return
    }
    successCallback();
}