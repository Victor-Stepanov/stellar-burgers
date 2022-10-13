import { Route, Redirect } from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks";

export function ProtectedRoute({ children, ...rest }) {
  const { user } = useAppSelector((store) => store.userData);
  return (
    <Route
      {...rest}
      render={({ location }) =>
      user ? (
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
