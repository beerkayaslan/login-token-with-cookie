import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { LOGGED_IN, LOGGED_OUT } from '../redux/features/auth-slice';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch();
    const USER_COOKIE = useSelector((state: RootState) => state.auth.USER_COOKIE);

    const USER = useMemo(() => USER_COOKIE ? JSON.parse(USER_COOKIE) : null, [USER_COOKIE]);

    useEffect(() => {
        if (!USER) {
            dispatch(LOGGED_OUT());
        }else{
            dispatch(LOGGED_IN(USER));
        }
    }, [USER, dispatch]);


    return children
}