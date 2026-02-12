import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hoc/auth-context';
import { registerUser, createUserHandle } from '../../Services/db.services/user.services';
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
          <div className="input-layout">
            <input
              value={user.handle}
              onChange={updateUser('handle')}
              type="text"
              placeholder="Enter Handle"
              id="handle"
            />
            {errors.handle && <p className="error">{errors.handle}</p>}
          </div>
        </div>
        <div className="field">
          <label htmlFor="First Name">First Name: </label>
          <div className="input-layout">
            <input
              value={user.firstName}
              onChange={updateUser('firstName')}
              type="text"
              placeholder="Enter First Name"
              id="firstName"
            />
            {errors.firstName && <p className="error">{errors.firstName}</p>}
          </div>
        </div>
        <div className="field">
          <label htmlFor="Last Name">Last Name: </label>
          <div className="input-layout">
            <input
              value={user.lastName}
              onChange={updateUser('lastName')}
              type="text"
              placeholder="Enter Last Name"
              id="lastName"
            />
            {errors.lastName && <p className="error">{errors.lastName}</p>}
          </div>
        </div>
        <div className="field">
          <label htmlFor="email">Email: </label>
          <div className="input-layout">
            <input
              value={user.email}
              onChange={updateUser('email')}
              type="email"
              placeholder="Enter e-mail"
              id="email"
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
        </div>
        <div className="field">
          <label htmlFor="password">Password: </label>
          <div className="input-layout">
            <input
              value={user.password}
              onChange={updateUser('password')}
              type="password"
              placeholder="Enter password"
              id="password"
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
        </div>
      </div>
      <button onClick={register}>Register</button>
    </div>
  );
}
