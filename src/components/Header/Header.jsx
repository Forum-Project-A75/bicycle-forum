import { getSettings } from '../../Services/db.services/settings.service.js';
import { useEffect } from 'react';
import { useState } from 'react';
import { useAuth } from '../../hoc/auth-context.jsx';
import UserNav from '../../views/UserNav/UserNav.jsx';
import GuestNav from '../../views/GuestNav/GuestNav.jsx';
import AdminNav from '../../views/AdminNav/AdminNav.jsx';
import { logout } from '../../Services/user.services/user.service.js';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import { createLogger, LOG_MODULES } from '../../debug/debug.js';

const log = createLogger(LOG_MODULES.HEADER);

export default function Header() {
  const { user, userData, setUserData, setUser } = useAuth();
  const [forumName, setForumName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function loadForumName() {
      try {
        const name = await getSettings('forum_name');
        setForumName(name);
      } catch (err) {
        log.err(err.message, err);
      }
    }
    loadForumName();
  }, []);

  const renderNav = () => {
    if (!user) return <GuestNav />;
    if (userData && userData.role && userData.role === 'admin')
      return <AdminNav />;
    return <UserNav />;
  };

  return (
    <div id="header">
      <div id="forum-name">{forumName || 'Loading...'}</div>
      <div id="nav">
        {renderNav()}
        {user && (
          <button onClick={() => logout(setUserData, setUser, navigate)}>
            Logout
          </button>
        )}
      </div>
      {userData && <span>Welcome: {userData.handle}</span>}
    </div>
  );
}
