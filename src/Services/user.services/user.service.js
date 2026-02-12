import { logoutUser } from "../db.services/user.services";

export const logout = (setAppState, navigate) => {
  logoutUser()
    .then(() => {
      setAppState({ user: null, userData: null });
      navigate('/');
    })
    .catch((error) => {
      console.error('Logout failed', error);
    });
};
