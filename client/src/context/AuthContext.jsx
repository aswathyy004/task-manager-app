import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, registerUser } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }

    setLoading(false);
  }, []);

  // LOGIN
  const login = (userData) => {
  setUser(userData);

  localStorage.setItem(
    "user",
    JSON.stringify(userData)
  );

  localStorage.setItem(
    "token",
    userData.token
  );
};

  // REGISTER
  const register = async (name, email, password) => {
    const data = await registerUser({ name, email, password });

    setUser(data);
    setToken(data.token);

    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("token", data.token);

    return data;
  };

  // LOGOUT
  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook (clean usage)
export const useAuth = () => useContext(AuthContext);