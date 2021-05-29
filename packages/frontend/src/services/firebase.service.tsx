import firebase from "firebase/app";
import "firebase/database";
import { createContext, useContext } from "react";

const FirbaseSerivceContext = createContext(null);

export function ProvideDatabse({ children }) {
   const methods = useFirebaseService();
   return (
      <FirbaseSerivceContext.Provider value={methods}>
         {children}
      </FirbaseSerivceContext.Provider>
   );
}

export const useFirebaseDatabase = () => {
   return useContext(FirbaseSerivceContext);
};

function useFirebaseService() {
   // Profile API
   const users = (uid: string) => {
      return firebase.database().ref(`users/${uid}`);
   }

   // 

   return {
      users
   };
}
