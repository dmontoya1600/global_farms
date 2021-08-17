import { UPDATE_BUYPOWER } from "./farm";
require('dotenv').config()

// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const ADD_FARM ='session/farms/ADD_FARM';
const LOAD_FARMS = 'session/farms/LOAD_FARMS';
const REMOVE_SAVE = 'session/farms/REMOVE_SAVE'
const LOAD_WALLET  = 'session/wallet/LOAD_WALLET'
const LOAD_ERROR = 'session/error/LOAD_ERROR'
const LOAD_OWNED_FARMS = 'session/ownedFarms/LOAD_OWNED_FARMS'

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

const loadWallet = (wallet) =>({
  type: LOAD_WALLET,
  payload: wallet
})

export const loadError = (error) =>({
  type: LOAD_ERROR,
  payload: error,
})

export const loadOwnedFarms = (res) => ({
  type: LOAD_OWNED_FARMS,
  payload: res,
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

export const updateUser = (form, user) => async (dispatch) => {
  const formData = new FormData()

  formData.append('username', form.username)

  formData.append('email', form.email)

  formData.append('userId', user.id)


  const response = await fetch(`/api/users/${form.id}`, {
    method: 'POST',
    body: formData,
  })

  const data = await response.json()

  dispatch(setUser(data))
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


  dispatch(deleteSave(farmId))


}

export const getSavedFarms = (userId) => async(dispatch) => {

  const response = await fetch(`/api/farms/${userId}/save`)

  const data = await response.json()

  dispatch(loadFarms(data.saved_farms))

}

export const getWallet = (userId) => async(dispatch) => {
  const response = await fetch(`/api/users/${userId}/wallet`)
  const data = await response.json()

  dispatch(loadWallet(data))
}

export const getOwnedFarms = (userId) => async(dispatch) => {
  const response = await fetch(`/api/transactions/${userId}/owned`)

  const data = await response.json()

  dispatch(loadOwnedFarms(data))
}



export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload }
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
    case LOAD_WALLET:
      return {
        ...state, wallet: action.payload
      }
    case UPDATE_BUYPOWER:
      return {
        ...state, wallet: action.payload
      }
    case LOAD_ERROR:
      return {
        ...state, error: action.payload
      }
    case LOAD_OWNED_FARMS:
      return {
        ...state, ownedShares: action.payload.owned_farms, portfolio_value: action.payload.total_value
      }
    default:
      return state;
  }
}
