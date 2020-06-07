import React, { useEffect } from "react";
import axios from "axios";
import { Switch, Route } from "react-router-dom";
import Login from "./components/registrations/Login";
import Signup from "./components/registrations/Signup";
import Paperbase from "./components/dashboard/Paperbase";
import { withRouter } from "react-router";
import "./App.css";
import { loginUser, handleClickLogOut } from "./API/APIs";
import { connect } from "react-redux";

function App(props) {
  const {
    setLogOutState,
    setLogInData,
    isLoggedIn,
    landlord,
    issues,
    tenants,
    todos,
    properties,
    addProperty,
    deleteProperty,
  } = props;

  useEffect(() => {
    loginStatus();
  });

  const loginStatus = () => {
    loginUser(handleLogin, handleLogout).catch((error) =>
      console.log("api errors:", error)
    );
  };

  const handleLogin = (data) => {
    setLogInData(data);
  };

  const handleLogout = () => {
    setLogOutState("logout");

    props.history.push("/login");
  };

  //update the properties state after a property been deleted
  const handlePropertyState = (property, action) => {
    if (action === "add") {
      addProperty(property);
    } else if (action === "delete") {
      deleteProperty(property);
    }
  };

  const handleClick = () => {
    handleClickLogOut()
      .then((response) => {
        this.handleLogout();

        this.history.push("/login");
      })
      .catch((error) => console.log(error));
  };

  const renderDashboard = () => {
    return (
      <Route
        path="/"
        render={(routeProps) => (
          <Paperbase
            {...routeProps}
            logout={() => handleClick()}
            user={landlord}
            properties={properties}
            issues={issues}
            tenants={tenants}
            handlePropertyState={handlePropertyState}
            todos={todos}
          />
        )}
      />
    );
  };

  return (
    <div>
      {isLoggedIn ? (
        renderDashboard()
      ) : (
        <Switch>
          <Route
            exact
            path="/login"
            render={(props) => (
              <Login
                {...props}
                handleLogin={handleLogin}
                loggedInStatus={isLoggedIn}
              />
            )}
          />
          <Route
            exact
            path="/signup"
            render={(props) => (
              <Signup
                {...props}
                handleLogin={handleLogin}
                loggedInStatus={isLoggedIn}
              />
            )}
          />
        </Switch>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn,
    landlord: state.landlord,
    issues: state.issues,
    tenants: state.tenants,
    todos: state.todos,
    properties: state.properties,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLogInData: (data) =>
      dispatch({ type: "SET_LOGIN_STATES", payload: { data } }),
    setLogOutState: (data) =>
      dispatch({ type: "SET_LOG_OUT", payload: { data } }),
    addProperty: (property) =>
      dispatch({ type: "ADD_PROPERTY", payload: { property } }),
    deleteProperty: (property) =>
      dispatch({ type: "DELETE_PROPERTY", payload: { property } }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
