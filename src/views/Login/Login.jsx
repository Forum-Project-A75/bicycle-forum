import { useState } from 'react';
import { useAuth } from '../../hoc/auth-context';
import { useLocation, useNavigate } from 'react-router-dom';
import './Login.css';
import { getUserData } from '../../Services/db.services/user.services.js';
import { validateLoginData } from './validate.data.js';
import { loginUser } from '../../Services/db.services/user.services.js';
import { createLogger, LOG_MODULES } from '../../debug/debug.js';


const log = createLogger(LOG_MODULES.LOGIN);


export default function Login() {
  
  const [userLoginData, setUserLoginData] = useState({
    email: '',
    password: '',
  });
  const { setUserData, setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const userLogin = async () => {
    if(!validateLoginData(userLoginData.email, userLoginData.password))return;

    try {
        const credentials = await loginUser(userLoginData.email, userLoginData.password);
        log.log("Credensials ", credentials);
        const supaUser = credentials.user;

        const data = await getUserData(supaUser.id);
        log.log("User data: ", data);
        
        //setUserData({user:supaUser, userData: { role: data.user_types.name, handle: data.handle }});

        setUserData({role : data.user_types.name, handle: data.handle, firstName: data.first_name, lastName: data.last_name, email: data.email});

        setUser(supaUser);

        navigate(location.state?.from?.pathname ?? '/profile');

    } catch (error) {
        log.error("LOGIN ERROR: ", error.message);
        alert(error.message);
      }
  };

  const updateUserLoginData = (prop) => (e) => {
    setUserLoginData({
      ...userLoginData,
      [prop]: e.target.value,
    });
  };

  return (
    <div id="login-f">
      <h2>Login</h2>
      <div id="fields">
        <div className="field">
          <label htmlFor="email">Email: </label>
          <input
            value={userLoginData.email}
            onChange={updateUserLoginData('email')}
            type="text"
            name="email"
            id="email"
          />
        </div>
        <div className="field">
          <label htmlFor="password">Password: </label>
          <input
            value={userLoginData.password}
            onChange={updateUserLoginData('password')}
            type="password"
            name="password"
            id="password"
          />
        </div>
      </div>
      <button type = "button" onClick={userLogin}>Login</button>
    </div>
  );
}
