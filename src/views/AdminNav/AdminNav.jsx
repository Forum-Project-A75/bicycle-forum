import { NavLink } from 'react-router-dom';

export default function AdminNav() {
  return (
    <>
      <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
        Home
      </NavLink>
      <NavLink
        to="/posts"
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        All Posts
      </NavLink>
      <NavLink
        to="/create"
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        Create Post
      </NavLink>
      <NavLink
        to="/tags"
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        Tags
      </NavLink>

      <NavLink
        to="/admin/users"
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        Moderation
      </NavLink>
      <NavLink
        to="/profile"
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        Profile
      </NavLink>
    </>
  );
}
