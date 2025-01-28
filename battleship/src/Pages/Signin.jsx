import Login from "../components/Login";
import Register from "../components/Register";
import './css/Signin.css';

export default function Signin() {
    return(
        <div className="login-register">
            <Login />
            <Register />
        </div>
    );
}