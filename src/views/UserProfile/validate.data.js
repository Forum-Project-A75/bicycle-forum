import { MIN_NAME_LENGTH,MAX_NAME_LENGTH } from "../../constants";

export const checkInputUserData = (user) => {
    const errors = {};

    if(!user.firstName) {
        errors.firstName = 'Please enter First Name';
    } else if(user.firstName < MIN_NAME_LENGTH && user.firstName > MAX_NAME_LENGTH) {
        errors.firstName = `First Name should have at least ${MIN_NAME_LENGTH} symbols and not great than ${MAX_NAME_LENGTH} symbols`;
    }
    
    if(!user.lastName) {
        errors.lastName = 'Please enter Last Name';
    } else if(user.lastName < MIN_NAME_LENGTH && user.lastName > MAX_NAME_LENGTH) {
        errors.lastName = `Last Name should have at least ${MIN_NAME_LENGTH} symbols and not great than ${MAX_NAME_LENGTH} symbols`;
    }

    return errors;
};