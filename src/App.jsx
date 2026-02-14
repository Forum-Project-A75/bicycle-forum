import { useState, useEffect } from 'react';
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

function App() {
  const [userData, setUserData] = useState({
    user: null,
    userData: null,
  });

  useEffect(() => {
    const setImage = async () => {
      const imagePath = await getImage();
      document.body.style.backgroundImage = `url(${imagePath})`;
    };
    setImage();
  }, []);

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ ...userData, setUserData }}>
        <Header />

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/admin/users" element={<ProtectedRoute allowedRoles={["admin"]}><AdminNav /></ProtectedRoute>}/>
          <Route path="/user/users" element={<ProtectedRoute allowedRoles={["user"]}><UserNav /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute allowedRoles={["user"]}><UserProfile /></ProtectedRoute>} />

        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
