import { getUserByEmail, getUserByHandle } from '../../Services/db.services/user.services';
import { createLogger, LOG_MODULES } from '../../debug/debug';
import { MIN_NAME_LENGTH, MAX_NAME_LENGTH, MIN_PASSWORD_LENGTH } from '../../constants.js';

const log = createLogger(LOG_MODULES.REGISTER);


export const checkUserRegistrationData = async (user) => {
    const errors = {};

    if (!user.email) {
        errors.email = 'Please enter an email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
        errors.email = "invalid email address";
    } else {
        try {
            const userFromDB = await getUserByEmail(user.email);
            if(userFromDB) {
                errors.email = `User ${user.handle} already exists`;
            }
        }
        catch(error) {
            log.error("checkUserRegistrationData: ", error.message);
            alert(error.message);
        }
    }

    if(!user.password) {
        errors.password = 'Please enter password';
    } else if(user.password.length < MIN_PASSWORD_LENGTH) {
        errors.password = `Please password should be at least ${MIN_PASSWORD_LENGTH} symbols`;
    }

    if(!user.firstName) {
        errors.firstName = 'Please enter First Name';
    } else if(user.firstName.length < MIN_NAME_LENGTH || user.firstName.length > MAX_NAME_LENGTH) {
        errors.firstName = `First Name should have at least ${MIN_NAME_LENGTH} symbols and not great than ${MAX_NAME_LENGTH} symbols`;
    }

    if(!user.lastName) {
        errors.lastName = 'Please enter Last Name';
    } else if(user.lastName.length < MIN_NAME_LENGTH || user.lastName.length > MAX_NAME_LENGTH) {
        errors.lastName = `Last Name should have at least ${MIN_NAME_LENGTH} symbols and not great than ${MAX_NAME_LENGTH} symbols`;
    }

    if(!user.handle) {
        errors.handle = 'Please enter Handle';
    } else {
        try {
            const userFromDB = await getUserByHandle(user.handle);
            if(userFromDB) {
                errors.handle = `User ${user.handle} already exists`;
            }
        }
        catch(error) {
            log.error("checkUserRegistrationData: ", error.message);
            alert(error.message);
        }
    }

    return errors;
  }