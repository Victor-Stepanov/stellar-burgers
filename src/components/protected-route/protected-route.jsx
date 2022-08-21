import {Route, Redirect } from 'react-router-dom';

export function ProtectedRoute({ anonymous = false,
  children, ...rest }) {
  
  if (anonymous) {
    return <Redirect to="/" />
  }
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