import { createContext, useEffect, useState } from "react";
import { loginMe } from "../../services/Auth";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);

  const handlerLogin = async () => {
    try {
      const res = await loginMe();
      if (res.status === 200) {
        setAuthUser(res.data);
        localStorage.setItem("authUser", JSON.stringify(res.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const userLocal = JSON.parse(localStorage.getItem("authUser"));
    console.log(token);
    console.log(userLocal);
    if (userLocal) {
      setAuthUser(userLocal);
    }

    if (!userLocal && token) {
      console.log("Fetch info user");
      handlerLogin();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        setAuthUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
