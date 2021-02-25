/* eslint-disable */
import React, { useState } from 'react';
import { FP } from "@fp-pro/client"
import * as fingerprintApi from "../Apis/fingerprint"




export default function Example() {
    const handleClick = () => {

        let obj = new fingerprintApi.FingerPrint({
            fingerprint: "342",
            device: "342",
            campaign_source: "234",
            campaign_medium: "324",
            campaign_name: "fds"
        })
        console.log(obj)
        fingerprintApi.createFingerPrint(obj, () => {console.log('success')}, (e) => {console.log(e)})
    }
    return (
        <div>
            <button onClick={() => handleClick()}>
                Click me
            </button>
        </div>
    );
}