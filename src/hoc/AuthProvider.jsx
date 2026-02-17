import { useEffect, useState } from "react";
import { supabase } from "../config/supabase-config";
import { AuthContext } from "./auth-context";
import { getUserData } from "../Services/db.services/user.services";

//const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // ⭐ ключовото

  useEffect(() => {

    // // 1. проверка дали има вече логнат потребител
    // supabase.auth.getSession().then(({ data: { session } }) => {
    //   setUser(session?.user ?? null);
    //   setLoading(false);
    // });

    const getSession = async () => { 
        const { data } = await supabase.auth.getSession(); 
        const currentUser = data?.session?.user ?? null;
        setUser(currentUser); 
        
        
        if(currentUser) {
          const data = await getUserData(currentUser.id);
          if (data) setUserData({role : data.user_types.name, handle: data.handle, firstName: data.first_name, lastName: data.last_name, email: data.email});
          else setUserData(null);
        }

        setLoading(false); 

        
    }; 
    
    getSession();

    // 2. слушаме future login/logout
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => listener.subscription.unsubscribe();

  }, []);

  return (
    <AuthContext.Provider value={{ user, userData, setUserData, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

//export const useAuth = () => useContext(AuthContext);