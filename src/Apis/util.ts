/* eslint-disable */
import * as fingerprintApi from "../Apis/fingerprint"
import * as Cookie from "js-cookie";
import * as fpjs from "fingerprintjs2";
import { SHA256 } from 'crypto-js';
import { cookieSettings } from "./base";



const delay = (ms: number) => new Promise(res => setTimeout(res, ms));


export const getDate = (d: Date): string => {
    return d.toISOString().replace('T', ' ').replace('Z', '')
}

export const toDate = (d: string): Date => {
    return new Date(d)
}

export default function fp() {
    let obj = new fingerprintApi.FingerPrint({
        fingerprint: "342",
        device: "342",
        campaign_source: "234",
        campaign_medium: "324",
        campaign_name: "fds"
    })
    console.log(obj)
    fingerprintApi.createFingerPrint(obj, () => { console.log('success') }, (e) => { console.log(e) })
}


const _fp_Cookie = "fp_";
const fp_Cookie = _fp_Cookie + '0800fc577294c34e0b28ad2839435945';

export const getFingerprint = async () => {
    let fp = Cookie.get(fp_Cookie);
    if (fp === undefined || fp?.length === 0) {
        await delay(500);
        let components = await fpjs.getPromise(<fpjs.Options>{
            canvas: true,
        });
        let result = components.reduce<CryptoJS.WordArray>((res, component) => {
            return SHA256(JSON.stringify(component) + res.toString());
        }, SHA256(fp_Cookie));
        console.log(result);
        Cookie.set(fp_Cookie, result.toString(), <Cookie.CookieAttributes>cookieSettings);
        return result.toString();
    }
    return fp;
}

interface loc {
    lat: number,
    lng: number
}

export const getLatLng = async () => {
    let response = await window.fetch("https://get.geojs.io/v1/ip/geo.json");
    if (response.ok && response.status === 200) {
        let json = await response.json();
        console.log(json);
        return <loc>{
            lat: json.latitude,
            lng: json.longitude
        }
    } else {// If error return mumbai location
        return <loc>{
            lat: 19.076090,
            lng: 72.877426
        }
    }
}
