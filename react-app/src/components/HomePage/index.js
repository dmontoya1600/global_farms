import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { createFarm } from '../../store/farm';
import './HomePage.css'
import { formContext } from './Context';
import CreateFarm from '../Farm/CreateFarm';
import WatchList from './WatchList';
import SlideShow from './SlideShow';
import News from './News';

function HomePage() {
  const farm = useSelector(state => state.farm);
  const user = useSelector(state => state.session.user)
  const wallet = useSelector(state => state.session.wallet)
  const ownedShares = useSelector(state => state.session.ownedShares)
  const portfolioValue = useSelector(state => state.session.portfolio_value)
  const dispatch = useDispatch();
  const history = useHistory()
  useEffect(() => {

  }, []);

  if(!user){
      history.push('/login')
  }



  return (
    <div className='home__page'>
        <div className='main__content'>
            <div className='wallet__content'>
            {ownedShares ? <SlideShow /> : <div>You don't own any shares yet!</div>}
            </div>
            <div className='main__buying__power'>Buying Power Available: ${wallet?.buyingPower}</div>
            <div className='news__label'>News</div>
            <News />
        </div>
        <div className='side__content'>
            <div className='list__title'>Lists</div>
            <WatchList />
        </div>
    </div>

  );
}
export default HomePage;
