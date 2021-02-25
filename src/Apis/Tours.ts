/* eslint-disable */
import * as base from "./base";
import { getDate } from './util'
import { isLoggedin } from "./Login";

export class Tour implements base.serverFunctions {
  first_name: string = "";
  last_name: string = "";
  company_name: string = "";
  email: string = "";
  mobile: string = "";
  date: string = "";
  time: string = "";

  constructor(json: any) {
    console.log(json)
    if (json) {
      this.first_name = json.firstName
      this.last_name = json.lastName
      this.company_name = json.companyName
      this.email = json.registerEmail
      this.mobile = json.mobile_no
      this.date = json.date;
      this.time = json.time;
    }
  }
  getCreateObject(): string {
    if (base.isLogin()) {
      return JSON.stringify({
        "datetime": getDate(new Date(this.date)),
      })
    } else
      return JSON.stringify({
        "first_name": this.first_name,
        "last_name": this.last_name,
        "company": this.company_name,
        "email": this.email,
        "mobile": this.mobile,
        "datetime": getDate(new Date(this.date)),
      })
  }

  getEditObject(): string {
    return ""
  }
  validate(): string[] {
    let errors = []
    if (!base.isLogin()) {
      let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.email)
      if (!(this.first_name.length > 0)) errors.push("First Name Cannot Be Empty");
      else if (!(this.last_name.length > 0)) errors.push("Last Name Cannot Be Empty");
      else if (!(this.company_name.length > 0)) errors.push("Company Name Cannot Be Empty");
      else if (!(this.email.length > 0)) errors.push("Email Address Cannot Be Empty");
      else if (!regex) errors.push("Enter valid email address");
      else if (!(this.mobile.length === 10)) errors.push("Mobile Number Cannot Be Empty");
    }
    if (this.date === null || this.date.length === 0) {
      errors.push("Date cannot be empty")
    }
    // if (this.time === null)
    //   errors.push("Time cannot be empty")
    return errors
  }
}
export const postTour = async (
  id: number,
  t_c: boolean,
  manager: Tour,
  successCallback: (json: string, status: number) => void,
  errorCallback: (msg: string[]) => void
) => {

  console.log(manager)
  let errors = manager.validate();
  if (errors.length > 0) {
    errorCallback(errors);
    return;
  }
  let type = 'anonymous'
  if (base.isLogin())
    type = 'customer'

  const response = await base.postAPI(`${type}/warehouse/${id}/tour?fingerprint=string&t_and_c=${t_c}`, manager.getCreateObject());
  if (!response.ok || response.status !== 200) {
    if (response.status === 404) {
      errorCallback(["Manager with this ID doesn't exist"]);
    } else if (response.status === 502) {
      errorCallback(["Some Error Occured Try Again"]);
      return;
    }
  }

  let json = await response.json()
  successCallback(json, response.status);
}

