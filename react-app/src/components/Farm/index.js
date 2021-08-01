import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadFarm, updateFarm } from '../../store/farm';
import './Farm.css'

function Farm() {
  const farm = useSelector(state => state.farm)
  const { farmId }  = useParams();
  const dispatch = useDispatch();
  let [fieldValue, setFieldValue] = useState(null)

  useEffect(() => {
    if (!farmId) {
      return;
    }
    (async () => {
        dispatch(loadFarm(farmId))
    })();
  }, [farmId]);

async function handleFieldUpdate(){
    await dispatch(updateFarm(fieldValue));
}

function editField(fieldValue){
    console.log('THIS IS THE EDIT FIELD VALUE', fieldValue[0])
    return (<form className='editForm' onSubmit={() => handleFieldUpdate()} >
                <input className={fieldValue[1]} type='text' value={fieldValue[0]} onChange={(e) => {setFieldValue([e.target.value, fieldValue[1]])}} />
                <button type='submit' hidden/>
            </form>)
}

// MAKE SURE TO TELL THE USER HOW TO UPDATE SOMEHOW

  return (
    !farm ? <div>Farm does not exist</div> :
    <div className='farm__page'>
        <div className='farm__content'>

            {fieldValue?.[1] === 'farm__name' ? editField(fieldValue) :
                <div value={farm.name} className='farm__name' onClick={(e) => setFieldValue([farm.name, 'farm__name'])}>{farm.name}</div>
            }

            {fieldValue?.[1] === 'farm__yield' ? editField(fieldValue) :
                <div value={farm.averageYield} className='farm__yield' onClick={(e) => setFieldValue([farm.averageYield, 'farm__yield'])}>{farm.averageYield}</div>
            }
        </div>
        <div className='farm__order'>
            <div>FORM CONTENT</div>
            <div>Add to Lists</div>
        </div>
    </div>

  );
}
export default Farm;
