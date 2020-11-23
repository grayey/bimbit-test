import { lazy } from "react";

// lazy load components -> on-demand retrieval

const Home = lazy(() => import("./Home")); 


const publicRoutes = [
  {
    path: "/",
    component: Home,
    exact:true
  }

];

export default publicRoutes;
