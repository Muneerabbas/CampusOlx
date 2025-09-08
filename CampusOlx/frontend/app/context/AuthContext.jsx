import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // while checking storage
  const router = useRouter();
  // Load token on app start
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const userData = await AsyncStorage.getItem("user");
        if (token && userData) {
          setUser(JSON.parse(userData));
        }
      } catch (err) {
        console.log("Error loading user:", err);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // login and save token
  const login = async (userData, token) => {
    try {
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      router.replace("/(tabs)/home");
    } catch (err) {
      console.log("Error saving user:", err);
    }
  };

  // logout and clear storage
  const logout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");

      setUser(null);
      router.replace("(auth)/Signup");
    } catch (err) {
      console.log("Error clearing user:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
