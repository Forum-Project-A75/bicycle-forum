import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hoc/auth-context';
import { registerUser, createUserHandle, getUserData } from '../../Services/db.services/user.services';
import { checkUserRegistrationData } from './validate.data';
import './Register.css';
import { debugLog, debugErrorLog } from '../../debug/debug';

export default function Register() {
  const [userRegistrationData, setUserRegistrationData] = useState({
    handle: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const [registrationErrors, setResistrationErrors] = useState({});
  const { user, setUserData } = useAuth();
  const navigate = useNavigate();

  const updateUserRegistrationData = (prop) => (e) => {
    setUserRegistrationData({
      ...userRegistrationData,
      [prop]: e.target.value,
    });
  };

  const register = async () => {
    const validationErrors = await checkUserRegistrationData(userRegistrationData);
    console.log(validationErrors);
    if (Object.keys(validationErrors).length !== 0) {
      setResistrationErrors(validationErrors);
    } 
    else {
      registerUser(user.email, user.password)
        .then((credential) => {
          return createUserHandle(
            user.handle,
            credential.user.id,
            user.email,
            user.firstName,
            user.lastName,
          ).then(() => {
            setUserData({ user: credential.user, userData: null });
          })
        })
        .catch((error) => {
          debugErrorLog("ERROR registerUser: " + error.message);
          alert(error.message);
        });

      getUserData(user.id)
        .then((data) => {
          debugLog("DATA: " + data);
          setUserData( prev => ({...prev, userData: {role : data.user_types.name}}));
        })
        .catch((error) => {
          debugErrorLog("ERROR getUserData: " + error.message);
          alert(error.message);
        });

        navigate('/');
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
            {registrationErrors.handle && <p className="error">{registrationErrors.handle}</p>}
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
            {registrationErrors.firstName && <p className="error">{registrationErrors.firstName}</p>}
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
            {registrationErrors.lastName && <p className="error">{registrationErrors.lastName}</p>}
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
            {registrationErrors.email && <p className="error">{registrationErrors.email}</p>}
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
            {registrationErrors.password && <p className="error">{registrationErrors.password}</p>}
          </div>
        </div>
      </div>
      <button onClick={register}>Register</button>
    </div>
  );
}
