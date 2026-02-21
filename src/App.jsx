import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import './App.css';
import Login from './views/Login/Login.jsx';
import { AuthContext } from './hoc/auth-context.jsx';
import Register from './views/Register/Register.jsx';
import Home from './views/Home/Home.jsx';
//import { getImage } from './Services/db.services/getImage.js';
import { getImage } from './Services/db.services/getImage.js';
import AdminNav from './views/AdminNav/AdminNav.jsx';
import ProtectedRoute from './Routes/ProtectedRoute/ProtectedRoute.jsx';
import UserNav from './views/UserNav/UserNav.jsx';
import UserProfile from './views/UserProfile/UserProfile.jsx';
import { useAuth } from './hoc/auth-context.jsx';
import PostEditor  from './views/PostEditor/PostEditor.jsx'
import ShowPosts from './components/ShowPosts/ShowPosts.jsx';
import PostDetails from './views/PostDetails/PostDetails.jsx';

function App() {
  // const [userData, setUserData] = useState({
  //   user: null,
  //   userData: null,
  // });

  const {setUser, setUserData, user, userData, loading} = useAuth();

  useEffect(() => {
    const setImage = async () => {
      const imagePath = await getImage();
      document.body.style.backgroundImage = `url(${imagePath})`;
    };
    setImage();
  }, []);

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{setUser, setUserData, user, userData, loading}}>
        <Header />

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/admin/users" element={<ProtectedRoute allowedRoles={["admin"]}><AdminNav /></ProtectedRoute>}/>
          <Route path="/user/users" element={<ProtectedRoute allowedRoles={["user"]}><UserNav /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute allowedRoles={["user"]}><UserProfile /></ProtectedRoute>} />
          <Route path="/create" element={<ProtectedRoute allowedRoles={["user", "admin"]}><PostEditor /></ProtectedRoute>} />
          <Route path="/posts" element={<ProtectedRoute allowedRoles={["user", "admin"]}><ShowPosts/> </ProtectedRoute>} />
          <Route path="/post/:id" element={<PostDetails />} />

          

        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;


