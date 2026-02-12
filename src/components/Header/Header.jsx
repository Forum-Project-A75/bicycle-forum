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

export default function Header() {
  const { user, userData, setUserData } = useAuth();
  const [forumName, setForumName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function loadForumName() {
      try {
        const name = await getSettings('forum_name');
        setForumName(name);
      } catch (err) {
        console.error(err);
      }
    }
    loadForumName();
  }, []);

  const renderNav = () => {
    if (!user) return <GuestNav />;
    if (user.role === 'admin') return <AdminNav />;
    return <UserNav />;
  };

  return (
    <div id="header">
      <div id="forum-name">{forumName || 'Loading...'}</div>
      <div id="nav">{renderNav()}</div>
      {user && <button onClick={() => logout(setUserData, navigate)}>Logout</button>}
      {userData && <span>Welcome, {userData[0].handle}</span>}
    </div>
  );
}
