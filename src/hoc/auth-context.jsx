import { createContext, useContext } from 'react';

export const AuthContext = createContext({
    user: null,
    UserData: null,
    setUserData: () => {} 
});

export const useAuth = () => {
  return useContext(AuthContext);
};