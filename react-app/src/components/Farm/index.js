import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadFarm } from '../../store/farm';

function Farm() {
  const [user, setUser] = useState({});
  const { farmId }  = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!farmId) {
      return;
    }
    (async () => {
        dispatch(loadFarm(farmId))
    })();
  }, [farmId]);

  return (
    <div>
        This Route works!
    </div>
  );
}
export default Farm;
