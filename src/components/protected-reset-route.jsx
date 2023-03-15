import { Navigate, Route, useLocation } from 'react-router-dom';

export function ProtectedResetRoute({ children, ...rest }) {
  const location = useLocation();

  const { from } = location.state || { from: { pathname: '/' } }

    return (
      <Route
        {...rest}
        render={({ location }) =>
          from === '/forgot-password' ? (
            children
          ) : (
            <Navigate
              to={{
                pathname: '/forgot-password'
              }}
            />
          )
        }
      />
    )
}
