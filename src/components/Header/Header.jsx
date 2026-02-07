//import { useContext } from 'react';
//import { NavLink } from 'react-router-dom';
//import { useNavigate } from 'react-router-dom';
import { getSettings } from '../../Services/settings.service.js'
//import { useCallback, useState } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hoc/auth-context.jsx';
import UserNav from '../../views/UserNav/UserNav.jsx';
import GuestNav from '../../views/GuestNav/GuestNav.jsx';



/*
*/

// export default function Header() {
//   const [forumName, setForumName] = useState('');

//   useEffect(() => {
//     async function loadForumName() {
//       try {
//         const name = await getSettings('forum_name');
//         setForumName(name);
//       } catch (err) {
//         console.error(err);
//       }
//     }

//     loadForumName();
//   }, []); 

//   return (
//     <header>
//       <h1>{forumName || 'Loading...'}</h1>
//     </header>
//   );
// }


//<nav>
//        <NavLink to='/'>Home</NavLink>
//        {user && (<>
//        <NavLink to='/tweets'>All Tweets</NavLink>
//        <NavLink to='/create-tweet'>Create Tweet</NavLink>
//        </>)}
//        {!user && <NavLink to='/login'>Login</NavLink>}
//        {!user && <NavLink to='/register'>Register</NavLink>}
//      </nav>
//      {user && <button onClick={() => logout(setAppState, navigate)}>Logout</button>}
//      {userData && <span>Welcome, {userData[0].handle}</span>}







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
    <header>
       <h1>{forumName || 'Loading...'}</h1>
       <br/>
       <br/>
        <nav>
        {renderNav()}
      </nav>
    </header>
  );
}

//  return (
//     <header>
//        <h1>{forumName || 'Loading...'}</h1>
//        <br/>
//        <br/>
//        {!user && <NavLink to='/login'>Login</NavLink>}
//        {!user && <NavLink to='/register'>Register</NavLink>}
//     </header>
//   );

//{!user && <NavLink to='/login'>Login</NavLink>}
//{user ? <UserNav /> : <GuestNav />}
