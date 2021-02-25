/* eslint-disable */
import * as base from './base'

export class ContactUs implements base.serverFunctions {
  fullName: string = ""
  companyName: string = ""
  email: string = ""
  mobile: string = ""
  message: string = ""

  constructor(json: any) {
    if (json) {
      this.fullName = json.fullName
      this.companyName = json.companyName
      this.email = json.email
      this.mobile = json.mobile
      this.message = json.message
    }
  }

  getCreateObject() {
    return JSON.stringify({
      full_name: this.fullName,
      company_name: this.companyName,
      email: this.email,
      mobile: this.mobile,
      message: this.message
    })
  }

  getEditObject() {
    return ""
  }

  validate(): string[] {
    console.log(this.email, this.fullName, this.companyName, this.mobile, this.message)
    let errors = []
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.email)
    if (!(this.fullName.length > 0)) errors.push('Full Name Cannot Be Empty')
    else if (!(this.companyName.length > 0)) errors.push('Company Name Cannot Be Empty')
    else if (!(this.email.length > 0)) errors.push('Email Cannot Be Empty')
    else if (!(this.mobile.length === 10)) errors.push('Mobile Number Cannot Be Empty')
    else if (!(this.message.length > 0)) errors.push('Message Cannot Be Empty')
    else if (!regex) errors.push('Enter a valid email')

    return errors
  }

}


export const contactUs = async (
  fingerprint: string,
  manager: ContactUs,
  successCallback: (json: any, status: number) => void,
  errorCallback: (errors: string[]) => void
) => {
  let errors = manager.validate();
  if (errors.length > 0) {
    errorCallback(errors);
    return;
  }
  const response = await base.postAPI(`anonymous/contact?fingerprint=test`, manager.getCreateObject())

  if (response.ok === false || response.status !== 200) {
    errorCallback(['Some Error Occured Try Again']);
    return;
  }
  const json = await response.json()
  successCallback(json, response.status);
}