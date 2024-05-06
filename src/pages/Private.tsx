import { useMeQuery, useLazyMeQuery } from "../redux/services/auth-service";
import { LOGGED_OUT } from "../redux/features/auth-slice";
import { useDispatch } from "react-redux";
import { authApi } from "../redux/services/auth-service";

export default function Private() {
    const dispatch = useDispatch();

    const { data } = useMeQuery({});
    const [fetchMe, { data: fetchData, error: fetchError }] = useLazyMeQuery();

    const handleMe = async () => {
        try {
            await fetchMe({});
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    const logOutHandle = () => {
        dispatch(LOGGED_OUT());
        dispatch(authApi.util.resetApiState());
    }

    return <div>
        <button onClick={handleMe}>me</button>
        <button onClick={logOutHandle}>Log Out</button>
        <div style={{ color: 'red' }}>{fetchError && 'error'}</div>
        <div>{JSON.stringify(data)}</div>
        <div>fetch data</div>
        <div>{JSON.stringify(fetchData)}</div>
    </div>
}