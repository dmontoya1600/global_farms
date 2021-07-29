const SET_FARM = 'farm/SET_FARM'

const setFarm = (farm) => ({
    type: SET_FARM,
    payload: farm
});

export const loadFarm = (id) => async (dispatch) => {
    const response = await fetch(`/api/farms/${id}`);
    const data = await response.json();

    console.log('this is the data', data)
}
