import { useState } from 'react';
import { useAuth } from '../../hoc/auth-context';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../../config/supabase-config';

const loginUser = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return data;
};

export default function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const { setUserData } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const login = () => {
    if (!user.email || !user.password) {
      return alert('Please enter an email and password');
    }

    loginUser(user.email, user.password)
      .then((credentials) => {
        setUserData({
          user: credentials.user,
          userData: null,
        });

        navigate(location.state?.from.pathname ?? '/');
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const updateUser = (prop) => (e) => {
    setUser({
      ...user,
      [prop]: e.target.value,
    });
  };

  return (
    <div>
      <h2>Login</h2>
      <label htmlFor="email">Email: </label>
      <input
        value={user.email}
        onChange={updateUser('email')}
        type="text"
        name="email"
        id="email"
      />{' '}
      <br /> <br />
      <label htmlFor="password">Password: </label>
      <input
        value={user.password}
        onChange={updateUser('password')}
        type="password"
        name="password"
        id="password"
      />
      <br /> <br />
      <button onClick={login}>Login</button>
    </div>
  );
}
