const initialState = {
    weather: [],
    loading: true,
    error: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_WEATHER_SUCCESS':
            return {
                ...state,
                characters: action.payload.results,
                countPages: action.payload.info.pages,
                loading: false,
                error: null
            };

        case 'FETCH_WEATHER_REQUEST':
            return {
                ...state,
                characters: [],
                loading: true,
                error: null
            };

        case 'FETCH_WEATHER_FAILURE':
            return {
                ...state,
                characters: [],
                loading: false,
                error: action.payload
            };

        default:
            return state;
    }
};

export default reducer;