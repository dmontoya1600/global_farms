// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const ADD_FARM ='session/user/ADD_FARM';
const LOAD_FARMS = 'session/user/LOAD_FARMS';
const REMOVE_SAVE = 'session/user/REMOVE_SAVE'

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER,
})

const addFarm = (farm) => ({
  type: ADD_FARM,
  payload: farm
})

const loadFarms = (farms) => ({
  type: LOAD_FARMS,
  payload: farms
})

const deleteSave = (id) => ({
  type: REMOVE_SAVE,
  payload: id
})

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
}

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });


  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};


export const signUp = (username, email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export const saveFarm = (farmId, userId) => async(dispatch) => {
  const formdata = new FormData()

  if(userId) formdata.append('userId', userId)

  const response = await fetch(`/api/farms/${farmId}/save`, {
    method: 'POST',
    body: formdata
  })

  const data = await response.json()

  dispatch(addFarm(data))
}

export const removeSave = (farmId, userId) => async(dispatch) => {
  const formdata = new FormData()

  if(userId) formdata.append('userId', userId)


  const response = await fetch(`/api/farms/${farmId}/save`, {
    method: 'DELETE',
    body: formdata
  })

  const data = await response.json()

  console.log('DELETE RES', data)

  dispatch(deleteSave(farmId))


}

export const getSavedFarms = (userId) => async(dispatch) => {

  const response = await fetch(`/api/farms/${userId}/save`)

  const data = await response.json()

  dispatch(loadFarms(data.saved_farms))

}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload }
    case REMOVE_USER:
      return { user: null }
    case ADD_FARM:
      return {
        ...state, farms: [...state.farms, action.payload]
      }
    case LOAD_FARMS:
      return {
        ...state, farms: action.payload
      }
    case REMOVE_SAVE:
      const newFarms = state.farms.filter(farm => farm.id !== action.payload)
      return {
        ...state, farms: newFarms
      }
    default:
      return state;
  }
}
