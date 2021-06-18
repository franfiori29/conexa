import './App.css';
import { Route, Switch } from 'react-router-dom';
import { UserProvider, useUserContext } from './context/UserContext';
import Navbar from './components/Navbar'
import Photos from './components/Photos';
import Posts from './components/Posts';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  return (
    <UserProvider>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/posts">
          <Posts />
        </Route>
        <Route exact path="/fotos">
          <Photos />
        </Route>
        <Route path='*' exact >
          <h1 className='text-center mt-5'>
            Esta página no existe
          </h1>
        </Route>
      </Switch>
    </UserProvider>
  );
}

export default App;
