import React  from "react";
import { Route } from "react-router-dom";

import { Login } from "../components/login/Login";
import { Registration } from "../components/registration/Registration";
import { Profile } from "../components/profile/Profile";
import { Main } from "../components/main/Main";
import { Dashboard } from "../components/dashboard/Dashboard";
import { Calculator } from "../components/calculator/Calculator";
import { ResetPassword } from "../components/reset-pass/ResetPassword";


export const RouteWithSubRoutes = (route) => {
   return (
      <Route
         path={route.path}
         render={(props) => (
            <route.component {...props} routes={route.routes} />
         )}
      />
   );
};
export const routes = [
   {
      path: "/",
      exact: true,
      name: "main",
      component: Main,
   },
   {
      path: "/login",
      exact: true,
      name: "Login",
      component: Login,
   },
   {
      path: "/registration",
      exact: true,
      name: "Registration",
      component: Registration,
   },
   {
      path: "/reset",
      exact: true,
      name: "Reset",
      component: ResetPassword,
   },
];

export const protectedRoutes = [
   {
      path: "/profile",
      exact: true,
      name: "Profile",
      component: Profile,
   },
   {
      path: "/dashboard",
      exact: true,
      name: "Dashboard",
      component: Dashboard,
      routes: [
        
      ]
   },
   {
      path: "/calc",
      exact: true,
      name: "Calculator",
      component: Calculator,
      routes: []
   },
];
