import React, { Component } from "react";
import "./App.css";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { logoutUser, setCurrentUser } from "./actions/authActions";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

//check for user token
if (localStorage.jwtToken) {
  //set AuthToken Header
  setAuthToken(localStorage.jwtToken);
  //decode the token and get the user
  const decoded = jwt_decode(localStorage.jwtToken);
  //set the user
  store.dispatch(setCurrentUser(decoded));

  //check for expired token
  const currtime = Date.now() / 1000;

  if (decoded.exp < currtime) {
    //logout user
    store.dispatch(logoutUser());
    //todo: clear current profile

    //redirect to login page
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          {" "}
          <div className='App'>
            <Navbar />
            <Route exact path='/' component={Landing} />
            <div className='container'>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
