import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import './App.css'
import Login from './views/Login/Login.jsx';
//import AuthProvider  from './hoc/UserAuthenticated.jsx';
import { AuthContext } from './hoc/auth-context.jsx';
import Register from './views/Register/Register.jsx';
import Home from './views/Home/Home.jsx';



// { <BrowserRouter>
//     <AppContext.Provider value={{...appState, setAppState }}>
//       <Header/>
//       <Routes>
//         <Route path='/' element={<Home />}/>
//         <Route path='/tweets' element={<Authenticated ><AllTweets /> </Authenticated>}/>
//         <Route path='/tweets/:id' element={<Authenticated ><SingleTweet /></Authenticated>}/>
//         <Route path='/create-tweet' element={<Authenticated ><CreateTweet /></Authenticated>}/>
//         <Route path='/login' element={<Login />}/>
//         <Route path='/register' element={<Register />}/>
//         <Route path='*' element={<NotFound />}/>
//       </Routes>
//       <br />
//       <footer>&copy;2024</footer>
//     </AppContext.Provider>
//     </BrowserRouter> }




function App() {

  const [appState, setAppState] = useState({
    user: null,
    userData: null,
    loading: true,
  });

  return (
    <BrowserRouter>
    <AuthContext.Provider value={{...appState, setAppState }}>
    <Header/>
    
    <Routes>
       <Route path='/login' element={<Login />}/>
       <Route path='/register' element={<Register />}/>
       <Route path='/home' element={<Home />}/>
    </Routes>
    </AuthContext.Provider>
    </BrowserRouter>
  )
}

//
//</AuthProvider.Provider>
export default App
//

      //   <Route path='/' element={<Home />}/>
      //   <Route path='/tweets' element={<Authenticated ><AllTweets /> </Authenticated>}/>
      //   <Route path='/tweets/:id' element={<Authenticated ><SingleTweet /></Authenticated>}/>
      //   <Route path='/create-tweet' element={<Authenticated ><CreateTweet /></Authenticated>}/>
       
      //   <Route path='/register' element={<Register />}/>
      //   <Route path='*' element={<NotFound />}/>
      // </Routes>