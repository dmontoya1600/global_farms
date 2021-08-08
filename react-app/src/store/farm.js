import { loadError } from './session'

export const SET_FARM = 'farm/SET_FARM'
export const UPDATE_BUYPOWER = 'session/wallet/UPDATE_BUYPOWER'

const updateBuyPower = (wallet) => ({
    type: UPDATE_BUYPOWER,
    payload: wallet,
})

const setFarm = (farm) => ({
    type: SET_FARM,
    payload: farm
});

export const loadFarm = (id) => async (dispatch) => {
    const response = await fetch(`/api/farms/${id}`);
    const data = await response.json();

    dispatch(setFarm(data))
}

export const createFarm = (form, image) => async (dispatch) => {
    const formData = new FormData()


    if(image) {
    formData.append("image", image)};
    formData.append('name', form.name);
    formData.append('location', form.location);
    formData.append('averageYield', form.averageYield);
    formData.append('about', form.about);
    formData.append('userId', form.userId);
    formData.append('stake', form.stake);
    formData.append('dilution', form.dilution);
    formData.append('price', form.price);

    console.log('THIS IT FELLAS', formData.data)
    const response = await fetch(`/api/farms/`, {
        method: "POST",
        body: formData,
    });

    const data = response.json()
    return data
}

export const deleteFarm = (farmId, userId) => async (dispatch) => {
    const formData = new FormData()

    if(userId) formData.append('userId', userId)
    const response = await fetch(`/api/farms/${farmId}`, {
        method: 'DELETE',
        body: formData,
    })
    const data = await response.json()
    console.log('THIS IS THE DELETE RES', data)

}

export const updateFarm = (form, image) => async (dispatch) => {
    const formData = new FormData()
    console.log('THIS IS THE DISPATCH FORM', form)
    if(image) {
        formData.append("image", image)};
    // request will be named: farm__name, farm__yield, farm__location
    // the request will then check if the request exist it will update
    formData.append('name', form.name)
    formData.append('location', form.location)
    formData.append('averageYield', form.averageYield)
    formData.append('about', form.about)

    const response = await fetch(`/api/farms/${form.id}`, {
        method: "PUT",
        body: formData
    });

    const data = await response.json()
    dispatch(setFarm(data))

}

export const getAverage = (farmId) => async (dispatch) => {
    const response = await fetch(`/api/transactions/${farmId}`);
    const data = await response.json();
    console.log('AVERAGE SHARE', data)
    return data.market_price;
}

export const makeOrder = (form) => async (dispatch) => {
    const formData = new FormData()
    let response;

    formData.append('orderType', form.orderType)
    formData.append('shares', form.shares)
    formData.append('farmId', form.farmId)
    formData.append('userId', form.userId)

    response = await fetch(`/api/transactions/`, {
        method: 'POST',
        body: formData,
    })

    const data = await response.json()

    console.log('ORDER DATA: ', data)
    if(data.message){
        await dispatch(loadError(data))
    }else{
        await dispatch(updateBuyPower(data))
    }
}

export default function reducer(state = {}, action) {
    switch (action.type) {
        case SET_FARM:
            return action.payload
        default:
            return state;
    }
}
