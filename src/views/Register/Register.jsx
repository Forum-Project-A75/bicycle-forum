import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hoc/auth-context';
import { registerUser, createUserHandle } from '../../Services/user.services';
import { checkData } from './validate.data';
import './Register.css';

export default function Register() {
  const [user, setUser] = useState({
    handle: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const [errors, setErrors] = useState({});
  const { setUserData } = useAuth();
  const navigate = useNavigate();

  const updateUser = (prop) => (e) => {
    setUser({
      ...user,
      [prop]: e.target.value,
    });
  };

  const register = async () => {
    const validationErrors = await checkData(user);
    console.log(validationErrors);
    if (Object.keys(validationErrors).length !== 0) {
      setErrors(validationErrors);
    } else {
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
            navigate('/');
          });
        })
        .catch((error) => {
          console.log(error.message);
          alert(error.message);
        });
    }
  };

  return (
    <div id="register-form">
      <h2>Register</h2>
      <div id="fields">
        <div className="field">
          <label htmlFor="handle">Handle: </label>
          <input
            value={user.handle}
            onChange={updateUser('handle')}
            type="text"
            placeholder="Enter Handle"
            id="handle"
          />
        </div>
        {errors.handle && (
          <>
            <br />
            <span className="error">{errors.handle}</span>
          </>
        )}
        <div className="field">
          <label htmlFor="First Name">First Name: </label>
          <input
            value={user.firstName}
            onChange={updateUser('firstName')}
            type="text"
            placeholder="Enter First Name"
            id="firstName"
          />
        </div>
        {errors.firstName && (
          <>
            <br />
            <span className="error">{errors.firstName}</span>
          </>
        )}
        <div className="field">
          <label htmlFor="Last Name">Last Name: </label>
          <input
            value={user.lastName}
            onChange={updateUser('lastName')}
            type="text"
            placeholder="Enter Last Name"
            id="lastName"
          />
        </div>
        {errors.lastName && (
          <>
            <br />
            <span className="error">{errors.lastName}</span>
          </>
        )}
        <div className="field">
          <label htmlFor="email">Email: </label>
          <input
            value={user.email}
            onChange={updateUser('email')}
            type="email"
            placeholder="Enter e-mail"
            id="email"
          />
        </div>
        {errors.email && (
          <>
            <br />
            <span className="error">{errors.email}</span>
          </>
        )}
        <div className="field">
          <label htmlFor="password">Password: </label>
          <input
            value={user.password}
            onChange={updateUser('password')}
            type="password"
            placeholder="Enter password"
            id="password"
          />
        </div>
        {errors.password && (
          <>
            <br />
            <span className="error">{errors.password}</span>
          </>
        )}
      </div>
      <button onClick={register}>Register</button>
    </div>
  );
}
