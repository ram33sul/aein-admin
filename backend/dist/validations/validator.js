import { validate } from "./validateParameters.js";
const isNotValid = (data) => {
    const validating = validate(data);
    if (!validating.status) {
        const error = new Error('Inputs are not valid!');
        error.messages = validating.errors;
        return error;
    }
    return false;
};
export default isNotValid;
