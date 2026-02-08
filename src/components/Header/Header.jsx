import { getSettings } from '../../Services/settings.service.js';
import { useEffect } from 'react';
import { useState } from 'react';
import { useAuth } from '../../hoc/auth-context.jsx';
import UserNav from '../../views/UserNav/UserNav.jsx';
import GuestNav from '../../views/GuestNav/GuestNav.jsx';
import AdminNav from '../../views/Admin/AdminNav.jsx';
import './Header.css';

export default function Header() {
  const { user } = useAuth();
  const [forumName, setForumName] = useState('');

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
    </div>
  );
}
