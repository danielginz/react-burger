import {Navigate, Route} from 'react-router-dom';
import React, { useMemo, PropsWithChildren, ReactFragment } from 'react';
import { useAppSelector } from '../../utils/uslessMove';

export type ProtectedRoute = PropsWithChildren<{
    noAuthRoute: string;
    kind: string;
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

        <>
            {
                check ? (
                    <>{children}</>
                ): (
                    <Navigate to='/login' replace />
                )
            }
        </>
    ) ;
}
