import { setDoc } from "firebase/firestore";
import React, { useEffect, useState, createContext } from "react";

import firebase from "../config/firebaseConfig";

export const AuthContext = createContext({
  user: null,
  loading: true,
  userData: null,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [user]);

  const fetchUserData = async () => {
    if (user) {
      const ref = firebase.firestore().collection("users").doc(user.uid);
      const snapshot = await ref.get();
      snapshot.data() && setProfileData(snapshot.data());
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, profileData }}>
      {children}
    </AuthContext.Provider>
  );
};
