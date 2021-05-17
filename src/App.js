import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import Navbar from "./components/pages/Navbar";
import Login from "./components/pages/Login";
import PrivateRouter from "./components/router/PrivateRouter";
import PageNotFound from "./components/pages/PageNotFound";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const token = localStorage.getItem("access_token");
  useEffect(() => {
    if (token && token !== "undefined") {
      setAuth(true);
    }
  }, [token]);

  const setAuth = (flag) => {
    setIsAuth(flag);
  };

  return (
    <Router>
      <div className="App">
        <Navbar setAuth={setAuth} />
        <Switch>
          <Route
            exact
            path="/"
            component={() =>
              isAuth ? <Redirect to="/home" /> : <Login setAuth={setAuth} />
            }
          />
          <PrivateRouter exact path="/home" component={Home} isAuth={isAuth} />
          <Route exact path="/about" component={About} />
          <PrivateRouter
            exact
            path="/contact"
            component={Contact}
            isAuth={isAuth}
          />
          <Route path="/*" component={PageNotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
