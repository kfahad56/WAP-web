/* eslint-disable */
import * as base from "./base";

export class Register implements base.serverFunctions {
  firstName: string = "";
  lastName: string = "";
  companyName: string = "";
  email: string = "";
  phoneNo: string = "";
  password: string = "";

  constructor(json: any) {
    if (json) {
      this.firstName = json.firstName;
      this.lastName = json.lastName;
      this.companyName = json.companyName;
      this.email = json.email;
      this.phoneNo = json.phoneNo;
      this.password = json.password;
    }
  }

  getCreateObject = () => {
    return JSON.stringify({
      "first_name": this.firstName,
      "last_name": this.lastName,
      "email": this.email,
      "mobile": this.phoneNo,
      "password": this.password,
      "company": this.companyName
    })
  }

  getEditObject = () => {
    return ""
  }

  validate(): string[] {
    let errors: string[] = [];
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.email)
    let passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(this.password)
    if (this.firstName.length === 0)
      errors.push("First Name cannot be empty");
    if (this.lastName.length === 0)
      errors.push("Last Name cannot be empty");
    if (this.companyName.length === 0)
      errors.push("Company Name cannot be empty");
    if (this.email.length === 0)
      errors.push("Email cannot be empty");
    if (!regex)
      errors.push("Enter a valid email address");
    if (this.phoneNo.length === 0)
      errors.push("Phone No cannot be empty");
    if (this.phoneNo.length !== 10)
      errors.push("Please enter a valid Phone number");
    if (isNaN(Number(this.phoneNo)))
      errors.push("Please enter a valid Phone number");
    if (this.password.length === 0)
      errors.push("Password cannot be empty")
    if (!passwordRegex)
      errors.push("Password must contain at least 1 upper and lower case character, 1 number, 1 special character and length must be at least 8 characters")

    return errors;
  }
}

export const register = async (
  manager: Register,
  t_c: boolean,
  successCallback: (status: number, json: string) => void,
  errorCallback: (msg: string[]) => void
) => {
  let errors = manager.validate();
  if (errors.length > 0) {
    errorCallback(errors);
    return;
  }
  const response = await base.postAPI(`auth/customer?fingerprint=test&t_and_c=${t_c}`, manager.getCreateObject());
  if (!response.ok || response.status !== 200) {
    if (response.status === 422) {
      errorCallback(["Phone number or Email already used"]);
      return;
    }
  }

  let json = await response.json()
  successCallback(response.status, json);
}


// this.setState({ isLoading: true });
//                         let manager = new registerAPI.Register({
//                             firstName: this.state.firstName,
//                             lastName: this.state.lastName,
//                             companyName: this.state.companyName,
//                             email: this.state.registerEmail,
//                             phoneNo: this.state.mobile_no,
//                             password: this.state.registerPassword
//                         })
//                         registerAPI.register(
//                             manager,
//                             (status, json) => {
//                                 this.setState({
//                                     isLoading: false,
//                                     showCreatedResponse: true,
//                                     status: status,
//                                     responseData: json,
//                                 })
//                             },
//                             () => { })
//                     }}>