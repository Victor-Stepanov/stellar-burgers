import { Route, Redirect, RouteProps } from "react-router-dom";
import { getCookie } from "../../utils/utils";


export function ProtectedRoute({ children, ...rest }:RouteProps):JSX.Element{
  const token = getCookie('token')
  return (
    <Route
      {...rest}
      render={({ location }) =>
      token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
  
}
