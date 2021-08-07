import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { createFarm, SET_FARM } from '../../store/farm';
import './Farm.css'

function CreateFarm() {
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch();
  let [name, setName] = useState(null);
  let [location, setLocation] = useState(null);
  let [averageYield, setAverageYield] = useState(null);
  let [bio, setBio] = useState(null);
  let [stake, setStake] = useState(0.60)
  let [dilution, setDilution] = useState(1000)
  let [price, setPrice] = useState(0.00)
  const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault()
        let form = {
            name: name,
            location: location,
            averageYield: Number(averageYield),
            about: bio,
            userId: user.id,
            stake: stake,
            dilution: dilution,
            price: Number(price),
        }
        let res = await dispatch(createFarm(form))
        history.push(`/farms/${res.id}`)
    }

  return (
    <div className='createFarm__page'>
         <form className='edit_form' onSubmit={(e) => handleSubmit(e)}>
                <div className='form__title'>Create Farm</div>
                <label>Farm Name
                    <input required type='text' value={name} onChange={(e) => {setName(e.target.value)}} />
                </label>
                <label>Location
                    <input required type='text' value={location} onChange={(e) => {setLocation(e.target.value)}} />
                </label>
                <label>Average Yield
                    <input required type='number' value={averageYield} onChange={(e) => {setAverageYield(e.target.value)}} />
                </label>
                <label>About Farm
                    <textarea required value={bio} onChange={(e) => {setBio(e.target.value)}} />
                </label>

                <label>Starting Price
                    <input value={price} type='number' onChange={(e) => setPrice(e.target.value)}/>
                </label>

                <label>Choose Dilution
                <select required onChange={(e) => setDilution(e.target.value)}>
                        <option value={1000}>Low Dilution: 1,000 Shares</option>
                        <option value={10000}>Medium Dilution: 10,000 Shares</option>
                        <option value={100000}>High Dilution: 100,000 Shares</option>
                    </select>
                </label>

                <label>Choose your personal stake
                <select required onChange={(e) => setStake(e.target.value)}>
                        <option value={.60}>60%</option>
                        <option value={.75}>75%</option>
                        <option value={.90}>90%</option>
                    </select>
                </label>
                <input type="submit" className='submit' />
            </form>
    </div>

  );
}
export default CreateFarm;
