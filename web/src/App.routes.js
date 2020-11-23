import React from "react";
import { Redirect } from "react-router-dom";
import AuthGuard from './auth/AuthGuard';

import publicRoutes from './views/public/public.routes';
import dashboardRoutes from './views/dashboard/dashboard.routes';



const redirectRoute = [
    {
      path: "/dashboard",
      exact: true,
      component: () => <Redirect to="/dashboard/reviews" />
    }
  ];
  
  const errorRoute = [
    {
      component: () => <Redirect to="/" />
    }
  ];


const AppRoutes = [
    ...publicRoutes,

    // auth-guarded routes
    {    
        path: "/dashboard",
        component: AuthGuard,
        routes:[
        ...dashboardRoutes,

        ...redirectRoute,
        ...errorRoute,
        ]
    }

  
  ];



export default AppRoutes;