import { useState } from "react";
import { useHistory, Link } from 'react-router-dom';
import { useUserContext } from "../../context/UserContext";
import Spinner from "../Spinner";

interface Props { };

const Register: React.FC<Props> = () => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { registerUser } = useUserContext();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerUser(user);
      history.push("/posts");
    } catch (error) {
      alert("Ya existe un usuario con ese nombre");
    };
    setLoading(false);
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setUser(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  if (loading) return <Spinner />;

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column align-items-center">
        <label htmlFor="username">Usuario</label>
        <input
          onChange={handleChange}
          name="username"
          type="text"
          placeholder="Usuario"
          required
          minLength={4}
        />
        <label htmlFor="password">Contraseña</label>
        <input
          onChange={handleChange}
          name="password"
          type="password"
          placeholder="Usuario"
          required
          minLength={6}
        />
        <button type="submit" className="btn btn-primary">
          Registrarse
        </button>
      </form>
      <Link to="/" className="m-5">Login</Link>
    </>
  )
}

export default Register;