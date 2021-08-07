import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { updateFarm, deleteFarm, getAverage, makeOrder } from '../../store/farm';
import {formContext} from '../HomePage/Context'
import './Farm.css'

function OrderForm() {
  const farm = useSelector(state => state.farm)
  const user = useSelector(state => state.session.user)
  const wallet = useSelector(state => state.session.wallet)
  const dispatch = useDispatch();
  let [orderType, setOrderType] = useState('buy')
  let [shares, setShares] = useState(null)
  let [marketPrice, setMarketPrice] = useState(null)
  let [estimatedPrice, setEstimatedPrice] = useState(0)
  let [estType, setEstType] = useState('Cost')
  let [formError, setError] = useState(null)


  useEffect(() => {
    (async () => {
      if(user){
        let avg = await dispatch(getAverage(farm.id));
        await setMarketPrice(avg)
      }
    })();

  }, [user?.id])

  useEffect(() => {
    setEstimatedPrice(marketPrice * shares)
  }, [shares])

  useEffect(() => {
    if(orderType === 'buy'){
        setEstType('Cost')
    } else{
        setEstType('Gains')
    }
  }, [orderType])

function handleSubmit(e) {
    e.preventDefault()
    let form = {
        orderType: orderType,
        shares: Number(shares),
        userId: user.id,
        farmId: farm.id,
    }
    if((form.shares % 1) !== 0){
        setError('Shares must be whole numbers')
    } else{
        dispatch(makeOrder(form))
    }
}

  return (
    <form className='order__form' onSubmit={(e) => handleSubmit(e)}>
        <label className='shares'>Shares
        </label>
        <input required id='sharesC' type='number' onChange={(e) => setShares(e.target.value)}/>

        <label className='order'>Order Type</label>
        <select className='orderC' onChange={(e) => (setOrderType(e.target.value))}>
            <option value='buy'>Buy</option>
            <option value='sell'>Sell</option>
        </select>

        <label className='avgPrice'>Market Price
        </label>
        <div className='average__price'>${marketPrice?.toFixed(2)}</div>

        <label className='estCost'>Estimated {estType}
        </label>
        <div className='estimated__price'>${estimatedPrice.toFixed(2)}</div>

        <button type='submit' className='rev'>Review Order</button>
        <div className='buy'>Buying Power Available: ${wallet?.buyingPower}</div>
        {formError ? <div>Error: {formError}</div> : null}
    </form>
  );
}
export default OrderForm;
