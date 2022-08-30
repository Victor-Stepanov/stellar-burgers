import { Route, Redirect } from "react-router-dom";
import { getCookie } from "../../utils/utils";

export function ProtectedRoute({ children, ...rest }) {
  const token = getCookie('token');
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
