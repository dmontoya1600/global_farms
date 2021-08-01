import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createFarm } from '../../store/farm';
import './HomePage.css'
import { formContext } from './Context';
import CreateFarm from '../Farm/CreateFarm';

function HomePage() {
  const farm = useSelector(state => state.farm);
  const { farmId }  = useParams();
  let [ activeForm, setActiveForm ] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {

  }, []);

    function createFarmForm(){
        return <formContext.Provider value={[activeForm, setActiveForm]}>
                        <CreateFarm />
                </formContext.Provider>
    }

  return (
    <div className='home__page'>
        {activeForm ? createFarmForm() : null }
        <div className='create__farm__button' onClick={() => setActiveForm(true)}>Create Farm</div>
    </div>

  );
}
export default HomePage;