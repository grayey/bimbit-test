import { lazy } from "react";

// lazy load components -> on-demand retrieval

const Home = lazy(() => import("./Home")); 


const publicRoutes = [
  {
    path: "/home",
    component: Home,
  }

];

export default publicRoutes;
