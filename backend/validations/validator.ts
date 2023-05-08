import { validate } from "./validateParameters.js";
import { keyable } from "../types/type.js";

const isNotValid = (data: {}) => {
    const validating: {status: boolean, errors?: {}[]} = validate(data);
    if(!validating.status){
        const error = new Error('Inputs are not valid!') as keyable
        error.messages = validating.errors;
        return error
    }
    return false;
}

export default isNotValid;