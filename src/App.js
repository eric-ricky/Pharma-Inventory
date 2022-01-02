import "./App.css";
import React, { useContext, useState } from "react";
import { AuthContext } from "./context/auth-context";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";

import Home from "./pages/Home/Home";
import Activities from "./pages/Activities/Activities";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Drugs from "./pages/Drugs/Drugs";
import Account from "./pages/Account/Account";

const App = () => {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const openHandler = () => {
    setIsOpen(true);
  };
  const closeHandler = () => {
    setIsOpen(false);
  };

  return (
    <BrowserRouter>
      {!user && (
        <>
          <Switch>
            <Route path={"/login"} component={Login} />
            <Route path={"/sign-up"} component={Signup} />
            <Route path={"/"} component={Login} />
          </Switch>
        </>
      )}
      {user && (
        <>
          <Navbar openHandler={openHandler} closeHandler={closeHandler} />
          <Sidebar isOpen={isOpen} closeHandler={closeHandler} />

          <Switch>
            <Route path={"/activities"} component={Activities} />
            <Route path={"/drugs"} component={Drugs} />

            <Route path={"/account"} component={Account} exact />
            <Route path={"/login"} component={user ? Home : Login} />
            <Route path={"/sign-up"} component={Signup} />
            <Route path={"/"} component={Home} exact />
          </Switch>
        </>
      )}
    </BrowserRouter>
  );
};

export default App;
