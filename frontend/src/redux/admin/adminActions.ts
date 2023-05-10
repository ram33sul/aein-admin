import { LOGGED_IN, LOGGED_OUT } from "./adminTypes"
import { AdminDataState } from "../../interfaces"

export const adminLogin = (data: AdminDataState) => {
    return {
        type: LOGGED_IN,
        payload: data
    }
}

export const adminLogout = () => {
    return { 
        type: LOGGED_OUT
    }
}
