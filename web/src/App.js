import React, { Suspense, createRef } from "react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { renderRoutes } from "react-router-config";

import Auth from "./auth/Auth";
import AppContext from "./context";
import history from "./history";
import { Store } from "./redux/Store";

import { NotificationContainer, } from "react-notifications";
import { FaCog } from 'react-icons/fa';
import './App.css';

import routes from "./App.routes";
import AppRoutes from "./App.routes";

const wrapper = createRef();

function App() {
  return (
    <AppContext.Provider value={{ routes }}>
      <Provider store={Store}>
      <Auth>
          <Suspense fallback={<FaCog/>}>
            <Router history={history}>{renderRoutes(AppRoutes)}</Router>
            <NotificationContainer/>
          </Suspense>
        </Auth>
      </Provider>
    </AppContext.Provider>
  );
}

export default App;
