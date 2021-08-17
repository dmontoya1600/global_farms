import React, { useState, useEffect } from 'react';
import env from "react-dotenv";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { loadFarm, updateFarm, updateFarmImage } from '../../store/farm';
import { saveFarm, removeSave } from '../../store/session';
import './Farm.css'
import EditFarmForm from './EditFarmForm';
import OrderForm from './OrderForm';
import News from '../HomePage/News';
import dotenv from  'dotenv'



function Farm() {
  let newsKey = process.env.REACT_APP_SUB_KEY
  const user = useSelector(state => state.session.user)
  const farms = useSelector(state => state.session.farms)
  const farm = useSelector(state => state.farm)
  const { farmId }  = useParams();
  const dispatch = useDispatch();
  let [fieldValue, setFieldValue] = useState(null)
  let [editFarm, setEditFarm] = useState(false)
  let [savedFarm, setSavedFarm] = useState(false)
  const history = useHistory()

  useEffect(() => {
    if (!farmId) {
      return;
    }
    (async () => {
       await dispatch(loadFarm(farmId))
    })();
  }, [farmId]);

  useEffect(() => {
    if (farms) {
        let checkForTrue = 0
        farms.forEach(key => {
            if (key.id === farm.id) {
                setSavedFarm(true)
                checkForTrue++
            }
        })
        if (checkForTrue === 0) setSavedFarm(false)
    }
  }, [farms?.length])

async function handleFieldUpdate(){
    await dispatch(updateFarm(fieldValue));
}

async function addToList(){
    await dispatch(saveFarm(farm.id, user.id))
}

async function removeFromList(){
    await dispatch(removeSave(farm.id, user.id))
}

if(!user) {
    history.push('/login')
}

async function uploadFile(e){
    await dispatch(updateFarmImage(e.target.files[0], farm.id))
}

function handleImageClick(){
    if(user.id === farm.userId){
        document.getElementById('file').click()
    }
}

  return (
    farm.id ===undefined ? <div>Farm does not exist</div> :
    <div className='farm__page'>
        <input id='file' type='file' hidden onChange={uploadFile}/>
        {editFarm ? <EditFarmForm setEditFarm={setEditFarm} editFarm={editFarm} /> : null}
        <div className='farm__content'>
            <div value={farm.name} className='farm__name'>{farm.name}</div>
            <div onClick={(e) => handleImageClick(e)} className='overlay__image'></div>
            <img className='farm__image' src={farm.image_url} />

            <div value={farm.averageYield} className='farm__yield' onClick={(e) => setFieldValue([farm.averageYield, 'farm__yield'])}>Average yield: {farm.averageYield * 100}%</div>

            <div className='farm__about__label'>About</div>
            {farm.about ? <div className='farm__about'>{farm.about}</div>
            : <div className='farm__no__about'>Farm has no biography yet.</div>}
            <News newsKey={newsKey} />
        </div>
        <div className='farm__order'>
            <OrderForm />
            {!savedFarm ? <div className='add__to__list' onClick={() => addToList()}>Add to Watchlist</div>: <div className='add__to__list' onClick={() => removeFromList()}>Remove from Watchlist</div>}
            {user?.id === farm.userId ? <div className='add__to__list' onClick={() => setEditFarm(true)}>Edit Page</div> : null}
        </div>
    </div>

  );
}
export default Farm;
