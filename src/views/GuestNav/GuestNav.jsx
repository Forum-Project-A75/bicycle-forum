import { NavLink } from 'react-router-dom';

// export default function GuestNav() {
//   return (
//     <nav>
//       <Link to="/login">Login</Link>
//       <Link to="/register">Register</Link>
//     </nav>
//   );
// }



export default function GuestNav() {
  return (
    <>
      <NavLink to="/login">Home</NavLink>{'    '}
      <NavLink to="/login">Login</NavLink>{'    '}
      <NavLink to="/register">Register</NavLink>
    </>
  );
}