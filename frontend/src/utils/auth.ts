import { useActions } from "../hooks/useActions";
import { localStorageIdToken } from "../types/api";

const loginUrl = "\login";

export const isValidAuth = (): boolean => {
    // const accessToken = localStorage.getItem("account_accessToken");
    const token = localStorage.getItem(localStorageIdToken);

    console.log("localStorage: token = ", token)

    return !!token;
    // const expire = localStorage.getItem("account_expire");

    // const delta = 1000 * 60 * 5;

    /*
    if (accessToken && expire) {
        const expireDate = new Date(expire);
        if (Date.now() >= expireDate.getTime() - delta) {
            return false;    
        }
    } else {
        return false;
    }
    

    return true; */
}

export const checkAuth = () => {
    return true;
    // if (!isValidAuth()) {
    //     return window.location.replace(loginUrl);
    // }
}