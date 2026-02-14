import { logoutUser } from "../db.services/user.services";
import { debugErrorLog } from "../../debug/debug";
import {supabaseID} from '../../config/supabase-config.js'

export const logout = (setAppState, navigate) => {
  logoutUser()
    .then(() => {
      setAppState({ user: null, userData: null });
      navigate('/');
    })
    .catch((error) => {
        debugErrorLog('ERROR logout failed', error);
    });
};

export function getAvatarUrl(uid) {
  if (!uid) return null;

  const base = `https://${supabaseID}.supabase.co/storage/v1/object/public/avatars`;

  return `${base}/${uid}/avatar.png?t=${Date.now()}`;
}




