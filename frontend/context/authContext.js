import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

// context
const AuthContext = createContext();

// provider
const AuthProvider = ({ children }) => {
  // global satate
  const [state, setState] = useState({
    user: null,
    token: "",
  });

  //   initial local storage data
  useEffect(() => {
    const loadLocalStorageData = async () => {
      let data = await AsyncStorage.getItem("@auth");
      let loginData = JSON.parse(data);
      setState({ ...state, user: loginData?.user, token: loginData?.token });
    };
    loadLocalStorageData();
  }, []);

  // default axios settings
  axios.defaults.baseURL = "http://172.31.112.120:8080";
  axios.defaults.headers.common["Authorization"] = `Bearer ${state?.token}`;

  return (
    <AuthContext.Provider value={[state, setState]}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
