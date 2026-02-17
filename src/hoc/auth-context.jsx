import { createContext, useContext } from 'react';

// export const AuthContext = createContext({
//   user: null,
//   userData: null,
//   setUserData: () => {},
// });

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};
