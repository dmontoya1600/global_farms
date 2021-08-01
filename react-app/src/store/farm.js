export const SET_FARM = 'farm/SET_FARM'

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

    const response = await fetch(`/api/farms/`, {
        method: "POST",
        body: formData,
    });

    const data = response.json()
    return data
}

export const updateFarm = (fieldValue, farmId, image) => async (dispatch) => {
    const formData = new FormData()

    if(image) {
        formData.append("image", image)};
    // request will be named: farm__name, farm__yield, farm__location
    // the request will then check if the request exist it will update
    formData.append(`${fieldValue[1]}`, fieldValue[0])
    const response = await fetch(`/api/farms/${farmId}`, {
        method: "POST",
        body: formData
    });
}

export default function reducer(state = {}, action) {
    switch (action.type) {
        case SET_FARM:
            return action.payload
        default:
            return state;
    }
}
