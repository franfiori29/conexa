import { useState } from "react";
import { useHistory, Link, Redirect } from 'react-router-dom';
import { useUserContext } from "../../context/UserContext";
import Spinner from "../Spinner";
import "./login.scss";

interface Props { };

const Login: React.FC<Props> = () => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { loginUser, user: contextUser } = useUserContext();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loginUser(user);
      history.push("/posts");
    } catch (err: any) {
      setLoading(false);
      if (err.response.status === 400) return alert("Usuario no existe");
      if (err.response.status === 401) return alert("Contraseña errónea");
    };
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setUser(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  if (contextUser) return <Redirect to="/posts" />

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
          autoComplete="off"
          minLength={4}
          required
        />
        <label htmlFor="password">Contraseña</label>
        <input
          onChange={handleChange}
          name="password"
          type="password"
          placeholder="Contraseña"
          autoComplete="off"
          minLength={6}
          required
        />
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      <Link to="/register" className="m-5">Registrarse</Link>
    </>
  )
}

export default Login;