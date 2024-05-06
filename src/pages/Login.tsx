import { useLoginMutation } from '../redux/services/auth-service';
import { useDispatch } from 'react-redux';
import { SET_USER_COOKIE } from '../redux/features/auth-slice';

export default function Login() {
    const dispatch = useDispatch();
    const email = 'dev1@mail.com';
    const password = 'Test123*';

    const [login] = useLoginMutation();

    const handleSubmit = async () => {
        try {
            const response = await login({ email, password }).unwrap();
            dispatch(SET_USER_COOKIE(response));

        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    return (
        <div>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}
