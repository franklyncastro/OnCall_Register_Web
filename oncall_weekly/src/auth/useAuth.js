import { useState } from "react";

const ADMIN_USER = "admincore";
const ADMIN_PASS = "core2026$%?"; 

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("auth") === "true"
  );

  const login = (usuario, password) => {
    if (usuario === ADMIN_USER && password === ADMIN_PASS) {
      localStorage.setItem("auth", "true");
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("auth");
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, logout };
}