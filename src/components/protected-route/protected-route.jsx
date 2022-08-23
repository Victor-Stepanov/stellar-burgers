import {Route, Redirect } from 'react-router-dom';

export function ProtectedRoute({ anonymous = false,
  children, ...rest }) {
  

  return (
    <Route
      {...rest}
      render={() => (
          children
        )
      }
    />
  );
} 