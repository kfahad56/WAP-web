/* eslint-disable */
import * as base from './base'

export const emailSub = async (
  email: string,
  successCallback: () => void,
  errorCallback: () => void
) => {
  const response = await base.postAPI(`anonymous/email/subscription?fingerprint=${"test"}`, JSON.stringify({ "email": email }))
  if (response.ok === false || response.status !== 200) {
    errorCallback();
    return;
  }

  // let json = await response.json();
  successCallback();
}

export const emailSubConfirm = async (
  token: string,
  successCallback: () => void,
  errorCallback: () => void
) => {
  const response = await base.postAPI(`anonymous/email/confirmation`, JSON.stringify({ "token": token }))
  console.log(response)
  if (response.ok === false || response.status !== 200) {
    errorCallback();
    return;
  }

  // let json = await response.json();
  successCallback();
}