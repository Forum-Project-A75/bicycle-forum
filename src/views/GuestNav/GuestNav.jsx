import { NavLink } from 'react-router-dom';

export default function GuestNav() {
  return (
    <>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/register">Register</NavLink>
    </>
  );
}
