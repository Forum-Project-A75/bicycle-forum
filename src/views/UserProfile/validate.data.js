import { MIN_NAME_LENGTH,MAX_NAME_LENGTH } from "../../constants";

//import { createLogger, LOG_MODULES } from "../../debug/debug";
//const log = createLogger(LOG_MODULES.USER_PROFILE);

export const checkInputUserData = (user) => {
    const errors = {};

    //log.log("checkInputUserData, user: ", user);

    if(!user.firstName) {
        errors.firstName = 'Please enter First Name';
    } else if(user.firstName.length < MIN_NAME_LENGTH || user.firstName.length > MAX_NAME_LENGTH) {

         //log.log("user.firstName ");
        errors.firstName = `First Name should have at least ${MIN_NAME_LENGTH} symbols and not great than ${MAX_NAME_LENGTH} symbols`;
    }
    
    if(!user.lastName) {
        errors.lastName = 'Please enter Last Name';
    } else if(user.lastName.length < MIN_NAME_LENGTH || user.lastName.length > MAX_NAME_LENGTH) {
        //log.log("user.lastName ");
        errors.lastName = `Last Name should have at least ${MIN_NAME_LENGTH} symbols and not great than ${MAX_NAME_LENGTH} symbols`;
    }

    return errors;
};