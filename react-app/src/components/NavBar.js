
import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

import logo from './favicon.ico'


const NavBar = () => {
const history = useHistory()
  function clickIcon(){
    history.push('/')
  }

  return (
    <nav className='navbar'>
        <div className='navbar__logo__container'>
          <img className='navbar__logo' onClick={() => clickIcon()} src={logo}/>
        </div>
        <div className='navbar__search__container'>
          <div>Search</div>
        </div>
        <div className='navbar__portfolio__container' >
          <NavLink to='/' exact={true} activeClassName='active'>
            Portfolio
          </NavLink>
        </div>
        <div className='navbar__account__container'>
          <LogoutButton />
        </div>
    </nav>
  );
}

export default NavBar;
