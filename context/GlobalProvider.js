import React, { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../lib/appwrite";
import AsyncStorage from '@react-native-async-storage/async-storage';


const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
    // getCurrentUser()
    //   .then((res) => {
    //     if (res) {
    //       setIsLogged(true);
    //       setUser(res);
    //     } else {
    //       setIsLogged(false);
    //       setUser(null);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
    
    useEffect(() => {
      const loadUser = async () => {
        try {
          // Retrieve user data from AsyncStorage
          const savedUser = await AsyncStorage.getItem('user');
          if (savedUser) {
            setUser(JSON.parse(savedUser));
            setIsLogged(true);
          } else {
            const res = await getCurrentUser();
            if (res) {
              setUser(res);
              setIsLogged(true);
              await AsyncStorage.setItem('user', JSON.stringify(res));
            } else {
              setIsLogged(false);
              setUser(null);
            }
          }
        } catch (error) {
          console.error("Failed to load user", error);
        } finally {
          setLoading(false);
        }
      };
      loadUser();
    }, []);

    const logout = async () => {
      try {
        await AsyncStorage.removeItem('user');
        setUser(null);
        setIsLogged(false);
      } catch (error) {
        console.error("Failed to log out", error);
      }
    };
  
  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
        logout
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
