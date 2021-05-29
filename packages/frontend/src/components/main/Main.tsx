import React from "react";
import { Link } from "react-router-dom";

export const Main: React.FC = () => {
   return (
      <>
         <Link to="/login">Login</Link>
         <Link to="/registration">Registration</Link>
      </>
   );
};
