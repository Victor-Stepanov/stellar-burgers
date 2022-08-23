import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export function ProtectedRoute({ ...rest }) {
  const user = useSelector((store) => store.userData.user);

  return !user ? (
    <Redirect
      to={{
        pathname: "/login",
      }}
    />
  ) : (
    <Route {...rest} />
  );
}
