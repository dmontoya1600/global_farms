import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { createFarm } from '../../store/farm';
import {formContext} from '../HomePage/Context'
import './Farm.css'

function CreateFarm() {
  const [activeForm, setActiveForm] = useContext(formContext)
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch();
  let [name, setName] = useState(null);
  let [location, setLocation] = useState(null);
  let [averageYield, setAverageYield] = useState(null);
  let [bio, setBio] = useState(null);
  const history = useHistory();

  useEffect(() => {

  }, []);

    async function handleSubmit() {
        let form = {
            name: name,
            location: location,
            averageYield: averageYield,
            about: bio,
            userId: user.id
        }
        let res = await dispatch(createFarm(form))
        setActiveForm(false)
        history.push(`/farms/${res.id}`)
    }

    async function handleDelete() {
        history.push('/')
    }

    function handleClose() {
        setActiveForm(false)
    }

  return (
    <div className='createFarm__page'>
         <div className='edit_form'>
                <div className='exit' onClick={handleClose}>X</div>
                <label>Farm Name
                    <input type='text' value={name} onChange={(e) => {setName(e.target.value)}} />
                </label>
                <label>Location
                    <input type='text' value={location} onChange={(e) => {setLocation(e.target.value)}} />
                </label>
                <label>Average Yield
                    <input type='number' value={averageYield} onChange={(e) => {setAverageYield(e.target.value)}} />
                </label>
                <label>About Farm
                    <textarea value={bio} onChange={(e) => {setBio(e.target.value)}} />
                </label>
                <button className='submit' onClick={handleSubmit}>Create</button>
            </div>
    </div>

  );
}
export default CreateFarm;
