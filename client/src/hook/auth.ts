import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import { useEffect, useState } from "react";
import http from "../utils/axios";
import { Api_ENdpoints } from "../config/Api_Endpoints";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const auth = getAuth();

  useEffect(() => {
    // onAuthStateChanged is a listener that is triggered when the user's sign-in state changes.
    const unsubscribe = onAuthStateChanged(auth, (userData) => {
      if (userData) {
        setIsAuthenticated(true);
        setUser(userData);
        http
          .post(Api_ENdpoints.USER_ROLE, {
            userId: userData.uid,
          })
          .then((response) => {
            setUserRole(response?.data?.role ?? "patient");
          });
      }
    });
    return () => unsubscribe();
  }, [auth]);

  // logout function to sign out the user
  const logout = async () => {
    try {
      await signOut(auth);
      setIsAuthenticated(false);
    } catch (error) {
      console.error(error);
    }
  };

  return { isAuthenticated, user, logout, userRole };
};
