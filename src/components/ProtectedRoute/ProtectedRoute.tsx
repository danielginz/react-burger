import {Navigate, Route} from 'react-router-dom';
import { useMemo, PropsWithChildren } from 'react';
import { useAppSelector } from '../../utils/uslessMove';

export type ProtectedRoute = PropsWithChildren<{
  noAuthRoute: string;
  kind: string;
  path: string;
  exact?: boolean;
}>

export function ProtectedRoute({ children, noAuthRoute, kind, ...rest } : ProtectedRoute) {

  const store = useAppSelector((store) => store)

  const check = useMemo(() => {
    if(kind === 'user'){
        return store.user.auth
    }

    if(kind === 'email'){
        return store.refresh.checkEmail
    }

    if(kind === 'login'){
        return !store.user.auth
    }

  }, [store, kind])

    return (
        /*<Route>
            {check} ? {children} : <Navigate to="/login" replace/>
        </Route>*/

        <Route>
            {
                check ? (
                    <>{children}</>
                ): (
                    <Navigate to='/login' replace />
                )
            }
        </Route>
    );

    /*return (
    <Route
      {...rest}
      render={({ location }) =>
      check ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: noAuthRoute,
              state: { from: location }
            }}
          />
        )
      }
    />
  );*/
}