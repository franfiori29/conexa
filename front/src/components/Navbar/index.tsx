import "./navbar.scss";
import { Link } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
interface Props { };

const Navbar: React.FC<Props> = () => {
  const { user, logout } = useUserContext();

  return (
    <div>
      <nav>
        <ul>
          <Link to="/posts">
            <li>Posts</li>
          </Link>
          <Link to="/fotos">
            <li>Fotos</li>
          </Link>
        </ul>
      </nav>
      {user && <p onClick={logout} className="text-right mr-5 logout">
        Logout
      </p>}
    </div>
  )
}

export default Navbar;