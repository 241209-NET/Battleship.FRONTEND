import './NavBar.css';
import { Link } from 'react-router-dom'
export default function NavBar() {
    return (
        <nav className="navBar">
            <div  className='Nav'>
                <Link to="/login" className='link'>Login</Link>
                <Link to="/signup" className='link'>Signup</Link>
                <Link to="/home" className='link'>Home</Link>
              </div>
        </nav>
      );
}