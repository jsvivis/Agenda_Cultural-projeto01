// BIBLIOTECAS
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

// IMPORTAÇÕES
import { useAuth } from './authContext';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...props} />
        ) : (
          <Navigate to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;
