import { service} from "../services/service";

export const weatherLoaded = (newWeather) => {
    return {
        type: 'FETCH_WEATHER_SUCCESS',
        payload: newWeather
    };
};

export const weatherRequested = () => {
    return {
        type: 'FETCH_WEATHER_REQUEST'
    }
};

export const weatherError = (error) => {
    return {
        type: 'FETCH_WEATHER_FAILURE',
        payload: error
    };
};

const fetchWeather = (dispatch) => (params) => {
    dispatch(weatherRequested());
    service.getWeather(params)
        .then((results) => {
            dispatch(weatherLoaded(results))
        })
        .catch((err) => {
                dispatch(weatherError(err.message))
            }
        )
}