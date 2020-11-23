import { lazy } from "react";

// lazy load components -> on-demand rendering

const ReviewsComponent = lazy(() => import("./Reviews")); 


const dashboardRoutes = [
  {
    exact: true,
    path: "/dashboard/reviews",
    component: ReviewsComponent,
  }

];

export default dashboardRoutes;
