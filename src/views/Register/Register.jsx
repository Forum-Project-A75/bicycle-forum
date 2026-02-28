import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hoc/auth-context';
import {
  registerUser,
  createUserHandle,
  getUserData,
} from '../../Services/db.services/user.services';
import { checkUserRegistrationData } from './validate.data';
import './Register.css';
import { createLogger, LOG_MODULES } from '../../debug/debug';

const log = createLogger(LOG_MODULES.REGISTER);

export default function Register() {
  const [userRegistrationData, setUserRegistrationData] = useState({
    handle: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const [registrationErrors, setRegistrationErrors] = useState({});
  const { setUserData, setUser } = useAuth();
  const navigate = useNavigate();

  const updateUserRegistrationData = (prop) => (e) => {
    setUserRegistrationData({
      ...userRegistrationData,
      [prop]: e.target.value,
    });
  };

  const register = async () => {
    try {
      // 1. validation
      const validationErrors =
        await checkUserRegistrationData(userRegistrationData);

      if (Object.keys(validationErrors).length !== 0) {
        setRegistrationErrors(validationErrors);
        return;
      }

      // 2. register auth user
      const credential = await registerUser(
        userRegistrationData.email,
        userRegistrationData.password,
      );

      const authUser = credential.user;

      // 3. create profile (handle table)
      await createUserHandle(
        userRegistrationData.handle,
        authUser.id,
        userRegistrationData.email,
        userRegistrationData.firstName,
        userRegistrationData.lastName,
      );

      // 4. load user data
      const data = await getUserData(authUser.id);

      // 5. set state
      setUser(authUser);

      setUserData({
        role: data.user_types.name,
        handle: data.handle,
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        userStatus: data.fk_user_status_id
      });

      // 6. navigate AFTER everything is ready
      navigate('/');
    } catch (error) {
      log.error('REGISTER FLOW ERROR:', error.message, error);
      alert(error.message);
    }
  };

  return (
    <div id="register-form">
      <h2>Register</h2>
      <div id="fields">
        <div className="field">
          <label htmlFor="handle">Handle: </label>
          <div className="input-layout">
            <input
              value={userRegistrationData.handle}
              onChange={updateUserRegistrationData('handle')}
              type="text"
              placeholder="Enter Handle"
              id="handle"
            />
            {registrationErrors.handle && (
              <p className="error">{registrationErrors.handle}</p>
            )}
          </div>
        </div>
        <div className="field">
          <label htmlFor="First Name">First Name: </label>
          <div className="input-layout">
            <input
              value={userRegistrationData.firstName}
              onChange={updateUserRegistrationData('firstName')}
              type="text"
              placeholder="Enter First Name"
              id="firstName"
            />
            {registrationErrors.firstName && (
              <p className="error">{registrationErrors.firstName}</p>
            )}
          </div>
        </div>
        <div className="field">
          <label htmlFor="Last Name">Last Name: </label>
          <div className="input-layout">
            <input
              value={userRegistrationData.lastName}
              onChange={updateUserRegistrationData('lastName')}
              type="text"
              placeholder="Enter Last Name"
              id="lastName"
            />
            {registrationErrors.lastName && (
              <p className="error">{registrationErrors.lastName}</p>
            )}
          </div>
        </div>
        <div className="field">
          <label htmlFor="email">Email: </label>
          <div className="input-layout">
            <input
              value={userRegistrationData.email}
              onChange={updateUserRegistrationData('email')}
              type="email"
              placeholder="Enter e-mail"
              id="email"
            />
            {registrationErrors.email && (
              <p className="error">{registrationErrors.email}</p>
            )}
          </div>
        </div>
        <div className="field">
          <label htmlFor="password">Password: </label>
          <div className="input-layout">
            <input
              value={userRegistrationData.password}
              onChange={updateUserRegistrationData('password')}
              type="password"
              placeholder="Enter password"
              id="password"
            />
            {registrationErrors.password && (
              <p className="error">{registrationErrors.password}</p>
            )}
          </div>
        </div>
      </div>
      <button onClick={register}>Register</button>
    </div>
  );
}
