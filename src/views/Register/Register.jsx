import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hoc/auth-context';
import {  registerUser, createUserHandle } from '../../Services/user.services';
import { checkData } from './validate.data';
import './Register.css';

export default function Register() {
  const [user, setUser] = useState({
    handle: '',
    email: '',
    password: '',
    firstName: '',
    lastName: ''    
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
    }
    else {
        registerUser(user.email, user.password)
        .then((credential) => {
              return createUserHandle(
                                      user.handle,
                                      credential.user.id,
                                      user.email,
                                      user.firstName,
                                      user.lastName
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
}


  return (
    <div>
      <h2>Register</h2>
      <label htmlFor="handle">Handle: </label>
      <input
        value={user.handle}
        onChange={updateUser('handle')}
        type="text"
        name="handle"
        placeholder="Enter Handle"
        id="handle"
      />{errors.handle && <span className="error">{errors.handle}</span>}
      <br /> 
      <label htmlFor="First Name">First Name: </label>
      <input
        value={user.firstName}
        onChange={updateUser('firstName')}
        type="text"
        name="firstName"
        placeholder="Enter First Name"
        id="firstName"
      />{errors.firstName && <span className="error">{errors.firstName}</span>}
      <br /> 
      <label htmlFor="Last Name">Last Name: </label>
      <input
        value={user.lastName}
        onChange={updateUser('lastName')}
        type="text"
        name="lastName"
        placeholder="Enter Last Name"
        id="lastName"
      />{errors.lastName && <span className="error">{errors.lastName}</span>}
      <br /> 
      <label htmlFor="email">Email: </label>
      <input
        value={user.email}
        onChange={updateUser('email')}
        type="email"
        name="email"
        placeholder="Enter e-mail"
        id="email"
      />{errors.email && <span className="error">{errors.email}</span>}
      <br /> 
      <label htmlFor="password">Password: </label>
      <input
        value={user.password}
        onChange={updateUser('password')}
        type="password"
        name="password"
        placeholder="Enter password"
        id="password"
      />{errors.password && <span className="error">{errors.password}</span>}
      <br /> 
      <button onClick={register}>Register</button>
    </div>
  );
}
