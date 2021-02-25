/* eslint-disable */
import * as base from "./base";
export class ResetPassword implements base.serverFunctions {
    password: string = "";
    token: string = "";
    constructor(json: any) {
        if (json) {
            this.password = json.password;
            this.token = json.token;
        }
    }
    getCreateObject = () => {
        return JSON.stringify({
            "password": this.password,
            "token": this.token,
        })
    }

    getEditObject = () => {
        return JSON.stringify({
            "password": this.password,
            "token": this.token,
        })
    }
    validate(): string[] {
        let errors: string[] = [];
        let passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(this.password)
        if (this.password.length === 0)
            errors.push("Password cannot be empty")
        if (!passwordRegex)
            errors.push("Password must contain at least 1 upper and lower case character, 1 number, 1 special character and length must be at least 8 characters")

        return errors;
    }
}
export const resetpassword = async (
    manager: ResetPassword,
    successCallback: (status: number, json: string) => void,
    errorCallback: (msg: string[]) => void,
) => {
    let errors = manager.validate();
    if (errors.length > 0) {
        errorCallback(errors);
        return;
    }
    const response = await base.postAPI(`auth/reset_password`, manager.getCreateObject());
    if (!response.ok || response.status !== 200) {
        errorCallback([""])
        return
    }
    let json = await response.json()
    successCallback(response.status, json);
}