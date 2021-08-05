import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import Account from './Account';

import logo from './favicon.ico'


const NavBar = () => {
  const history = useHistory()
  let [accountActive, setAccountActive] = useState(false)
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
          <div className='navbar__account__tab' onClick={() => setAccountActive(!accountActive)}>Account</div>
        </div>
        {accountActive ? <Account />
          : null}
    </nav>
  );
}

export default NavBar;
