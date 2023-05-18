import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = true; // Replace this with your own authentication logic

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Navigate
            to={{ pathname: "/login" }}
            replace
            state={{ from: rest.location }}
          />
        )
      }
    />
  );
};
export default PrivateRoute;
