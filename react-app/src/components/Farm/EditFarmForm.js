import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { updateFarm, deleteFarm } from '../../store/farm';
import {formContext} from '../HomePage/Context'
import './Farm.css'

function EditFarmForm({setEditFarm, editFarm}) {
  const farm = useSelector(state => state.farm)
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch();
  let [stateName, setName] = useState(farm.name);
  let [stateLocation, setLocation] = useState(farm.location);
  let [stateAverageYield, setAverageYield] = useState(farm.averageYield);
  let [stateAbout, setAbout] = useState(farm.about);
  let [deleteIsActive, setDeleteIsActive] = useState(false)
  const history = useHistory();




    async function handleSubmit() {
        let form = {
            name: stateName,
            location: stateLocation,
            averageYield: stateAverageYield,
            about: stateAbout,
            id: farm.id
        }
        let res = await dispatch(updateFarm(form))
        setEditFarm(false)
        // history.push(`/farms/${res.id}`)
    }

    async function handleDelete() {
        history.push('/')
        await dispatch(deleteFarm(farm.id, user.id))
    }

    function handleClose() {
        setEditFarm(false)
    }
    function confirmDelete(){
        return (
                <div className='confirm__delete__form'>
                    <div>Are you sure you wish to delete?</div>
                    <button className='delete__option' onClick={() => handleDelete()}>
                        Yes
                    </button>
                    <button className='delete__option' onClick={() => setDeleteIsActive(false)}>
                        No
                    </button>
                </div>
        )
    }

  return (
    <div className='background__shadow'>


        <div className='edit__farm__page'>
                <div className='exit' onClick={handleClose}>X</div>
                <label>Farm Name
                    <input type='text' value={stateName} onChange={(e) => {setName(e.target.value)}} />
                </label>
                <label>Location
                    <input type='text' value={stateLocation} onChange={(e) => {setLocation(e.target.value)}} />
                </label>
                <label>Average Yield
                    <input type='number' value={stateAverageYield} onChange={(e) => {setAverageYield(e.target.value)}} />
                </label>
                <label>About Farm
                    <textarea value={stateAbout} onChange={(e) => {setAbout(e.target.value)}} />
                </label>
                {deleteIsActive ? confirmDelete(): null}
                {!deleteIsActive ? <button className='submit' onClick={handleSubmit}>Update</button>: null}
                {!deleteIsActive ? <button className='delete' onClick={() => setDeleteIsActive(true)}>Delete Farm</button>: null}

        </div>
    </div>
  );
}
export default EditFarmForm;
