import { NavLink } from 'react-router-dom';

export default function GuestNav() {
  return (
    <>
      <NavLink to="/" className={({isActive}) => isActive ? "active" : ""}>Home</NavLink>
      <NavLink to="/login" className={({isActive}) => isActive ? "active" : ""}>Login</NavLink>
      <NavLink to="/register" className={({isActive}) => isActive ? "active" : ""}>Register</NavLink>
    </>
  );
}
