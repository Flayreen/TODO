import React from 'react'
import './App.css'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./pages/Login/Login.tsx";
import Registration from "./pages/Registration/Registration.tsx";
import NotFound from "./pages/NotFound/NotFound.tsx";
import {AuthProvider} from "./context/AuthContext.tsx";
import ProtectedRoute from "./routes/ProtectedRoute.tsx";
import {WebRoutes} from "./routes/routes.ts";
import {Provider} from "react-redux";
import {store} from "./store/store.ts";

const App = () => {
  return (
      <Provider store={store}>
          <AuthProvider>
            <Router>
              <Routes>
                <Route path={WebRoutes.Home} element={React.createElement(ProtectedRoute)}/>
                <Route path={WebRoutes.Login} element={React.createElement(Login)}/>
                <Route path={WebRoutes.Registration} element={React.createElement(Registration)}/>
                <Route path="*" element={React.createElement(NotFound)}/>
              </Routes>
            </Router>
          </AuthProvider>
      // </Provider>
  )
}

export default App;
