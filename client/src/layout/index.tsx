import React, { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useHistory, useLocation } from "react-router-dom";
import { URL } from "../config/routes";
import Header from "./Header";

type propsType = {
  children: React.ReactNode;
};

const MainLayout: React.FC<propsType> = ({ children }) => {
  const auth = getAuth();
  const history = useHistory();
  const { pathname } = useLocation();

  useEffect(() => {
    // onAuthStateChanged is a listener that is triggered when the user's sign-in state changes.
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user && pathname !== URL.HOMEPAGE) {
        history.push(URL.HOMEPAGE);
      }
    });

    return () => unsubscribe();
  }, [auth, history, pathname]);

  return (
    <div>
      <Header />
      <div className="pt-[50px]">{children}</div>
    </div>
  );
};

export default MainLayout;
