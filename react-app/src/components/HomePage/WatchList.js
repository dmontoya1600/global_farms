import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './HomePage.css'

function WatchList() {
  const farms = useSelector(state => state.session.farms);
  const dispatch = useDispatch();

  useEffect(() => {

  }, []);


  return (
    <div className='watchlist__component'>
        {farms ? <div className='watchlist__items'>WATCHLIST:
            {farms.map(farm => (
                <div className='watchlist__item' key={farm.id}>
                    {farm.name}
                </div>
            ))}
        </div> : <div>Watchlist is Empty</div>}
    </div>

  );
}
export default WatchList;
