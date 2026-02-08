import { NavLink } from 'react-router-dom';

export default function UserNav() {
  return (
    <>
      <NavLink to="/">Home</NavLink> <NavLink to="/posts">All Posts</NavLink>{' '}
      <NavLink to="/tags">Tags</NavLink>{' '}
      <NavLink to="/profile">Profile</NavLink>
    </>
  );
}
