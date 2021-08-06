import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { updateFarm, deleteFarm } from '../../store/farm';
import {formContext} from '../HomePage/Context'
import './Farm.css'

function OrderForm() {
  const farm = useSelector(state => state.farm)
  const user = useSelector(state => state.session.user)
  const wallet = useSelector(state => state.session.wallet)
  const dispatch = useDispatch();


  return (
    <div className='order__form'>
        <label className='shares'>Shares
        </label>
        <input id='sharesC' type='number' />

        <label className='avgPrice'>Market Price
        </label>
        <div className='average__price'>$15.70</div>

        <label className='estCost'>Estimated Cost
        </label>
        <div className='estimated__price'>$0.00</div>

        <div className='rev'>Review Order</div>
        <div className='buy'>Buying Power Available: ${wallet?.buyingPower}</div>
    </div>
  );
}
export default OrderForm;
