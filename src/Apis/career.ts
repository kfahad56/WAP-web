/* eslint-disable */
import * as base from './base'

export class Career implements base.serverFunctions {
    full_name: string = ""
    email_id: string = ""
    experience: string = ""
    job_type: string = ""
    mobile: string = ""
    cv: string = ""

    constructor(json: any) {
        if (json) {
            this.full_name = json.full_name
            this.email_id = json.email_id
            this.experience = json.experience
            this.job_type = json.job_type
            this.mobile = json.mobile
            this.cv = json.cv
        }
    }

    getCreateObject() {
        return JSON.stringify({
            full_name: this.full_name,
            email_id: this.email_id,
            experience: this.experience,
            job_type: this.job_type,
            mobile: this.mobile,
            cv: this.cv
        })
    }

    getEditObject() {
        return ""
    }

    validate(): string[] {
        let errors = []
        let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.email_id)
        if (!(this.full_name.length > 0)) errors.push('Full Name Cannot Be Empty')
        else if (!(this.email_id.length > 0)) errors.push('Email Cannot Be Empty')
        else if (!regex) errors.push('Enter a valid email')
        else if (!(this.experience.length > 0)) errors.push('Experience Cannot Be Empty')
        else if (!(this.job_type.length > 0)) errors.push('Job type Cannot Be Empty')
        else if (!(this.mobile.length === 10)) errors.push('Mobile Number Cannot Be Empty and should be 10 digits')
        else if (isNaN(Number(this.mobile))) errors.push("Please enter a valid Phone number")
        else if (!(this.cv === "")) errors.push('Please upload your cv')
        return errors
    }

}


export const career = async (
    manager: any,
    successCallback: (json: any, status: number) => void,
    errorCallback: (errors: string[]) => void
) => {
    // let errors = manager.validate();
    // if (errors.length > 0) {
    //     errorCallback(errors);
    //     return;
    // }
    const response = await base.postAPI(`anonymous/career`, manager)

    if (response.ok === false || response.status !== 200) {
        // errorCallback(['']);
        return;
    }
    const json = await response.json()
    successCallback(json, response.status);
}