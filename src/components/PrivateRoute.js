import React from "react";

/* REACT ROUTER */
import { Route, Redirect } from "react-router-dom";

/* CONTEXT */
import { useAuth } from "../contexts/AuthContext";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();

  return (
    <div>
      <Route
        {...rest}
        render={(props) => {
          return currentUser ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          );
        }}
      ></Route>
    </div>
  );
}
