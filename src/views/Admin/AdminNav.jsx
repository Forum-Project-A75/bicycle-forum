import { NavLink } from 'react-router-dom';

export default function AdminNav() {
  return (
    <>
      <NavLink to="/">Home</NavLink>{' '}
      <NavLink to="/posts">All Posts</NavLink>{' '}
      <NavLink to="/tags">Tags</NavLink>{' '}
      <NavLink to="/admin/users">Users</NavLink>{' '}
      <NavLink to="/admin/posts">Moderation</NavLink>
    </>
  );
}