import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import {useHistory } from 'react-router-dom';

const NavBar=()=> { 

  let history = useHistory();

  const logout=async (e) => { 
    e.preventDefault();

    //removing token from localstorage
    localStorage.removeItem("token");
    history.push('/login')

  }

    return (
        <div className="dash">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Mobigic</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
           
            <li  className="nav-item active logout">
                <button type="submit" className="btn btn-danger" onClick={(e) => logout(e)}>Logout</button>
              </li>
          </ul>
        </div>
      </nav>
        </div>
    )
}
export default NavBar;