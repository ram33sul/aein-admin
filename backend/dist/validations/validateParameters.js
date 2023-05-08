import valuePresence from "./isNotEmpty.js";
import { validateName } from "./validateValues.js";
const validateValue = (value) => {
    switch (value.field) {
        case 'name': return validateName(value.value);
        default: return true;
    }
};
export const validate = (values) => {
    const errors = valuePresence(values);
    if (errors.length !== 0) {
        return {
            status: false,
            errors
        };
    }
    const entries = Object.keys(values);
    for (let i = 0; i < entries.length; i++) {
        const isValid = validateValue({
            field: entries[i],
            value: values[entries[i]]
        });
        if (!isValid) {
            errors[errors.length] = `${entries[i]} is not valid!`;
        }
    }
    if (errors.length !== 0) {
        return {
            status: false,
            errors
        };
    }
    return {
        status: true
    };
};
