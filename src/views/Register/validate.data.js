import { getUserByEmail, getUserByHandle } from '../../Services/db.services/user.services';

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
            console.log(error);
            alert(error.message);
        }
    }

    if(!user.password) {
        errors.password = 'Please enter password';
    } else if(user.password.length < 8) {
        errors.password = 'Please password should be at least 8 symbols';
    }

    if(!user.firstName) {
        errors.firstName = 'Please enter First Name';
    } else if(user.firstName < 4 && user.firstName > 32) {
        errors.firstName = 'First Name should have at least 4 symbols and not great than 32 symbols';
    }

    if(!user.lastName) {
        errors.lastName = 'Please enter Last Name';
    } else if(user.lastName < 4 && user.lastName > 32) {
        errors.lastName = 'Last Name should have at least 4 symbols and not great than 32 symbols';
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
            console.log(error);
            alert(error.message);
        }
    }

    return errors;
  }