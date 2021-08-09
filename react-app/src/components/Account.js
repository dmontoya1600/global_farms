
import React, {useContext, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { AppContext } from '../AppContext';
import LogoutButton from './auth/LogoutButton';
import { formContext } from './HomePage/Context';


const Account = () => {
const history = useHistory()
const user = useSelector(state => state.session.user)
const wallet = useSelector(state => state.session.wallet)
const session = useSelector(state => state.session)
let {setActiveProfile} = useContext(AppContext)

  return (
    <div className='account__page'>
        <div className='account__header'>
            <div className='account__user'>{user?.username}</div>
            <div className='account__value'>${session.portfolio_value}</div>
            <div className='account__buyingpower'>${wallet?.buyingPower}</div>
            <div className='buyingPower__label'>Buying Power</div>
            <div className='value__label'>Portfolio Value</div>
        </div>
        <div className='account__content'>
            <div className='farm__tab' onClick={() => history.push('/create-farm')}>Create Farm</div>
            <div className='profile__tab' onClick={() => setActiveProfile(true)} >Profile</div>
            <LogoutButton />
        </div>
    </div>
  );
}

export default Account;
