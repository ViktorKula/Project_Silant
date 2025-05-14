// import { useActions } from "../hooks/useActions";
import { localStorageIdToken } from "../types/api";

// const loginUrl = "\login";

export const isValidAuth = (): boolean => {
    const token = localStorage.getItem(localStorageIdToken);
    console.log("localStorage: token = ", token)
    return !!token;
}

export const checkAuth = () => {
    return true;
}
