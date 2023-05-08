

export const validateName = (name: string) => {
    const validValue = /^[A-Za-z\s]+$/;
    return validValue.test(name) && name.length > 2 && name.length < 20;
}

export const validateUsername = (username: string) => {
    const validValue = /^[A-Za-z0-9]*$/;
    return validValue.test(username) && username.length < 16 && username.length > 3;
}

export const validateMobile = (mobile: string) => {
    const validValue = /^[0-9]*$/;
    return mobile.length === 10 && validValue.test(mobile);
}

export const validatePassword = (password: string) => {
    const validValue = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return validValue.test(password);
}

export const validateEmail = (email: string) => {
    const validValue = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return validValue.test(email);
}