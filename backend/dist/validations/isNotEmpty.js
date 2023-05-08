const valuePresence = (values) => {
    const errors = [];
    for (let value in values) {
        if (values[value] === null || values[value] === undefined || values[value] === '') {
            errors[errors.length] = {
                field: value,
                message: `${value} is required!`
            };
        }
    }
    return errors;
};
export default valuePresence;
