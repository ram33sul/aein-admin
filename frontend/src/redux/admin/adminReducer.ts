import { AdminDataState } from "../../interfaces"
import { LOGGED_IN, LOGGED_OUT } from "./adminTypes"

type actionType = {
    type: string,
    payload?: {}
}

type stateType = {
    data: AdminDataState | null
}

const initialState = {
    data: null
}

const adminReducer = (state: stateType = initialState ,action: actionType) => {
    switch(action.type){
        case LOGGED_IN: return {
            data: action.payload
        }
        case LOGGED_OUT: return {
            data: null
        }
        default: return state;
    }
}

export default adminReducer;