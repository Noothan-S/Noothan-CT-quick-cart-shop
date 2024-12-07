import { FC } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/features/auth/auth.slice";


const Register: FC = () => {
    const dispatch = useAppDispatch()
    return (
        <div>
            <button onClick={() => dispatch(setUser({
                token: '44343',
                user: "rererer"
            }))}>hello</button>
        </div>
    );
};

export default Register;