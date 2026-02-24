import { logoutUser } from "../db.services/user.services";
import {supabaseID} from '../../config/supabase-config.js'
import { createLogger, LOG_MODULES } from "../../debug/debug";

const log = createLogger(LOG_MODULES.DB); 

export const logout = (setUserData, setUser, navigate) => {
  logoutUser()
    .then(() => {
      setUserData(null);
      setUser(null);
      navigate('/');
    })
    .catch((error) => {
        log.error('ERROR logout failed', error.message, error);
    });
};

export function getAvatarUrl(uid) {
  if (!uid) return null;

  const base = `https://${supabaseID}.supabase.co/storage/v1/object/public/avatars`;

  return `${base}/${uid}/avatar.png?t=${Date.now()}`;
}





