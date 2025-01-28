import Login from "./Login";
import Register from "./Register";
import './Login.css';

export default function Signin() {
    return(
        <div className="login-register">
            <Login />
            <Register />
        </div>
    );
}