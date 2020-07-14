import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import API from "../helpers/api";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserFromCookies() {
      const token = Cookies.get("token");

      if (token) {
        console.log("Got a token in the cookies, lets see if it is valid");

        API.defaults.headers.Authorization = `Bearer ${token}`;
        const { data } = await API.get("/account/me");
        if (user) setUser(data.user);
      }

      setLoading(false);
    }

    loadUserFromCookies();
  }, []);

  const login = async (accountName, password) => {
    const { data: token } = await API.post("/account/login", {
      accountName,
      password,
    });

    if (token) {
      console.log("Got token", token);

      Cookies.set("token", token.token, { expires: 60 });
      API.defaults.headers.Authorization = `Bearer ${token.token}`;
      const { data: user } = await API.get("/account/me");
      setUser(user);
      console.log("Got user", user);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    window.location.pathname = "/login";
  };
  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, login, loading, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
