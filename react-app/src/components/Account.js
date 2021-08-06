
import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import CreateFarm from './Farm/CreateFarm';
import logo from './favicon.ico'
import { formContext } from './HomePage/Context';


const Account = () => {
const history = useHistory()
const user = useSelector(state => state.session.user)
const wallet = useSelector(state => state.session.wallet)

  return (
    <div className='account__page'>
        <div className='account__header'>
            <div className='account__user'>{user?.username}</div>
            <div className='account__value'>$EXAMPLE</div>
            <div className='account__buyingpower'>${wallet?.buyingPower}</div>
            <div className='buyingPower__label'>Buying Power</div>
            <div className='value__label'>Portfolio Value</div>
        </div>
        <div className='account__content'>
            <div className='farm__tab' onClick={() => history.push('/create-farm')}>Create Farm</div>
            <div className='profile__tab'>Profile</div>
            <LogoutButton />
        </div>
    </div>
  );
}

export default Account;
