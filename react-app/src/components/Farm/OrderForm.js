import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { updateFarm, deleteFarm } from '../../store/farm';
import {formContext} from '../HomePage/Context'
import './Farm.css'

function OrderForm() {
  const farm = useSelector(state => state.farm)
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch();


  return (
    <div className='order__form'>
        <label>Shares
            <input type='number' />
        </label>
        <label>Average Price
            <div>AVG DATA HERE</div>
        </label>
        <label>Estimated Cost
            <div>Estimated DATA HERE</div>
        </label>
        <div>Review Order</div>
        <div>$DOLLARS buying power available</div>
    </div>
  );
}
export default OrderForm;
