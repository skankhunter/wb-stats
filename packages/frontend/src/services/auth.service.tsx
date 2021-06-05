import React, { useState, useEffect, useContext, createContext } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";
import { useFirebaseDatabase } from "./firebase.service";

const {
   REACT_APP_BACKEND_SCHEMA,
   REACT_APP_BACKEND_HOSTNAME,
   REACT_APP_BACKEND_PORT,
} = process.env;
export const DEV_URL = `${REACT_APP_BACKEND_SCHEMA}${REACT_APP_BACKEND_HOSTNAME}${REACT_APP_BACKEND_PORT}/api/`;
const API_URL = DEV_URL + "auth/";

const devConfig = {
   apiKey: process.env.REACT_APP_DEV_API_KEY,
   authDomain: process.env.REACT_APP_DEV_AUTH_DOMAIN,
   databaseURL: process.env.REACT_APP_DEV_DATABASE_URL,
   projectId: process.env.REACT_APP_DEV_PROJECT_ID,
   appId: process.env.REACT_APP_DEV_APP_ID,
   storageBucket: process.env.REACT_APP_DEV_STORAGE_BUCKET,
   messagingSenderId: process.env.REACT_APP_DEV_MESSAGING_SENDER_ID,
   measurementId: process.env.REACT_APP_DEV_MEASUREMENT_ID,
};

const prodConfig = {
   apiKey: process.env.REACT_APP_DEV_API_KEY,
   authDomain: process.env.REACT_APP_DEV_AUTH_DOMAIN,
   databaseURL: process.env.REACT_APP_DEV_DATABASE_URL,
   projectId: process.env.REACT_APP_DEV_PROJECT_ID,
   storageBucket: process.env.REACT_APP_DEV_STORAGE_BUCKET,
   messagingSenderId: process.env.REACT_APP_DEV_MESSAGING_SENDER_ID,
};

const config = process.env.NODE_ENV === "production" ? prodConfig : devConfig;

// Add your Firebase credentials
firebase.initializeApp(config);
firebase.analytics();

const AuthContext = createContext(null);

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
   const auth = useProvideAuth();
   return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
   return useContext(AuthContext);
};

const getUserData = (userData: firebase.User) => {
   const { displayName, email, phoneNumber, uid } = userData;
   return {
      displayName,
      email,
      phoneNumber,
      uid,
   };
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
   const [user, setUser] = useState(null);
   const [loading, setLaoding] = useState(true);
   const database = useFirebaseDatabase();

   // Wrap any Firebase methods we want to use making sure ...
   // ... to save the user to state.
   const signin = (email: string, password: string, needRemember: boolean) => {
      return firebase
         .auth()
         .signInWithEmailAndPassword(email, password)
         .then((response) => {
            setUser(response.user);
            return response.user;
         });
   };
   const signup = (email, password) => {
      return firebase
         .auth()
         .createUserWithEmailAndPassword(email, password)
         .then((response) => {
            setUser(response.user);
            return response.user;
         });
   };
   const signout = () => {
      return firebase
         .auth()
         .signOut()
         .then(() => {
            setUser(false);
         });
   };
   const sendPasswordResetEmail = (email: string) => {
      return firebase.auth().sendPasswordResetEmail(email);
   };
   const confirmPasswordReset = (code, password) => {
      return firebase
         .auth()
         .confirmPasswordReset(code, password)
         .then(() => {
            return true;
         });
   };

   const updateEmail = (email: string) => {
      return firebase.auth().currentUser.updateEmail(email);
   };

   const updateLocalUserData = () => {
      return database
         .users(user.uid)
         .once("value")
         .then((snapshot) => {
            const data = snapshot.val();
            setUser({ ...user, ...data });
         });
   };

   // Subscribe to user on mount
   // Because this sets state in the callback it will cause any ...
   // ... component that utilizes this hook to re-render with the ...
   // ... latest auth object.
   useEffect(() => {
      const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            user.getIdToken(true).then((sessionToken) => {
               localStorage.setItem("sessionToken", sessionToken);
            });
            database
               .users(user.uid)
               .once("value")
               .then((snapshot) => {
                  const data = snapshot.val();
                  setUser({ ...user, ...data });
                  setLaoding(false);
               });
         } else {
            setUser(false);
            localStorage.removeItem("sessionToken");
            setLaoding(false);
         }
      });
      // Cleanup subscription on unmount
      return () => unsubscribe();
   }, []);

   // Return the user object and auth methods
   return {
      loading,
      user,
      signin,
      signup,
      signout,
      sendPasswordResetEmail,
      confirmPasswordReset,
      updateLocalUserData,
      updateEmail,
   };
}
