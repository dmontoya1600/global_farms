import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createFarm } from '../../store/farm';
import './HomePage.css'
import { formContext } from './Context';
import CreateFarm from '../Farm/CreateFarm';
import WatchList from './WatchList';

function HomePage() {
  const farm = useSelector(state => state.farm);
  const user = useSelector(state => state.session.user)
  const wallet = useSelector(state => state.session.wallet)
  const dispatch = useDispatch();

  useEffect(() => {

  }, []);



  return (
    <div className='home__page'>
        <div className='main__content'>
            <div className='main__buying__power'>${wallet?.buyingPower}</div>
            <div className='wallet__content'>
                <div className='slide__show__box'>
                    <div className='percantage__owned'>27%</div>
                    <div className='value__owned'>$3,456</div>
                </div>
            </div>
        </div>
        <div className='side__content'>
            <div className='list__title'>Lists</div>
            <WatchList />
        </div>
    </div>

  );
}
export default HomePage;
