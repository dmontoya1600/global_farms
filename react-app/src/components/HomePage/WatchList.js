import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './HomePage.css'

function WatchList() {
  const farms = useSelector(state => state.session.farms);
  const dispatch = useDispatch();
  const [activeList, setActiveList] = useState(true)
  const history = useHistory()

  useEffect(() => {

  }, []);

  function watchlistContent(){
    if(farms?.length > 0){
    return (
        <div className='watchlist__items'>
            {farms.map(farm => (
                <div onClick={() => history.push(`/farms/${farm.id}`)}className='watchlist__item' key={farm.id}>
                    {farm.name}
                </div>
            ))}
        </div>)
    } else {
        return (
            <div className='no__items'>No items in watchlist</div>
        )
    }
  }

  return (
    <div className='watchlist__component'>
        <div className='watchlist__tab' onClick={() => setActiveList(!activeList)}>
            Watchlist
            {!activeList ?
                <i className='fas fa-angle-down' />
            :   <i className='fas fa-angle-up' />}
        </div>
        {activeList ?
            watchlistContent()
        : null}
    </div>

  );
}
export default WatchList;
