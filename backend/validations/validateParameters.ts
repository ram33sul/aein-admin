import valuePresence from "./isNotEmpty.js"
import { validateName } from "./validateValues.js";
import { keyable } from "../types/type.js";

const validateValue = (value: {field: string, value: string}) => {
    switch(value.field){
        case 'name': return validateName(value.value);
        default: return true
    }
}
export const validate = (values: keyable) => {
    const errors = valuePresence(values);
    if(errors.length !== 0){
        return {
            status: false,
            errors
        };
    }
    const entries: string[] = Object.keys(values)
    for(let i: number = 0; i < entries.length; i++){
        const isValid = validateValue({
            field: entries[i],
            value: values[entries[i]]
        })
        if(!isValid){
            errors[errors.length] = `${entries[i]} is not valid!`;
        }
    }
    if(errors.length !== 0){
        return {
            status: false,
            errors
        }
    }
    return {
        status: true
    }
}
