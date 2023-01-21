import "../styles/globals.css";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import UserContext from "@/components/context/userContext";
import { getDataUser, logoutUser } from "@/request/auth";

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState([]);
  const [hide, setHide] = useState(false);
  const router = useRouter();


  useEffect(() => {
    const userData = async () => {
      const data = await getDataUser();
      if (data.status === 200) {
        setUser(data.data);
        setHide(true);
      }
    };
    userData();
  }, []);

  const handleLogout = async () => {
    const data = await logoutUser();
    if (data.status === 200) {
      setUser([]);
      setHide(false);
      router.push("/");
    }
  };
  

 //mantener la sesion al recargar la pagina
  useEffect(() => {
    if (user) {
      setHide(true);
    }
  }
  , [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        handleLogout,
        hide,
      }}
    >
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

