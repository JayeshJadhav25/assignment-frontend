import logo from './logo.svg';
import'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter,Route,Switch } from 'react-router-dom';
import LoginPage from './component/Login';
import RegisterPage  from './component/RegisterPage';
import Dashboard from './component/Dashboard';
import NavBar from './component/Navbar';
import Uploadfile from './component/Uploadfile';

function App() {
  return (
    <BrowserRouter>
      <div className = "container">
        <Switch>
        <Route path = "/" exact component = { LoginPage } />          
        <Route path = "/login" component = { LoginPage } />
        <Route path = "/register"  component = { RegisterPage } />
        <Route path = "/dashboard"  component = { Dashboard } />
        <Route path = "/navbar" component = { NavBar } />
        <Route path = "/upload" component = { Uploadfile } />


        </Switch>
        </div>
        </BrowserRouter>
  );
}

export default App;
