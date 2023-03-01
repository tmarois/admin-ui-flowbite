/**
 * Validate an email is correct format
 * @param { String } email 
 * @returns 
 */
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Will validate if string or value is a number
 * @param { String|Number } value 
 * @returns 
 */
export const validateNumber = (value) => {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

/**
 * Validate strong password
 * - Must have min 6 characters
 * - Must have one uppercase OR one lowercase 
 * - Must have letters and numbers
 * - Can not have any spaces
 * @param { String } password 
 * @returns 
 */
export const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])(?!.*\s).{6,}$/;
    const passwordLowercaseRegex = /[a-z]/;
    const passwordUppercaseRegex = /[A-Z]/;
    return (
        passwordRegex.test(password) &&
        (passwordLowercaseRegex.test(password) || passwordUppercaseRegex.test(password))
    );
}