import cloud from "./icons/cloud.png";
import sun from "./icons/sun.png";
import rain from "./icons/rain.png";
import partly from "./icons/partly-cloudy.png";

export const toCelsius = (temp, isCelcius) => {
    if (!temp) return '';
    if (isCelcius) return Math.floor(temp - 273.15);
    return Math.floor((temp - 273.15) * 9/5 + 32);
};

export const cardinalPoints = (deg) => {
    if (deg > 0 && deg < 45) return 'северо-восточный';
    if (deg >= 45 && deg <= 90) return 'восточный';
    if (deg > 90 && deg < 135) return 'юго-восточный';
    if (deg >= 135 && deg <= 180) return 'южный';
    if (deg > 180 && deg < 225) return 'юго-западный';
    if (deg >= 225 && deg <= 270) return 'западный';
    if (deg > 270 && deg < 315) return 'северо-западный';
    if (deg >= 315 && deg <= 360) return'северный';
};

export const weatherIcon = (icon) => {
    if (icon === 'Clouds') return cloud;
    if (icon === 'Clear') return sun
    if (icon === 'Rain') return rain
    return partly;
};

export const capitalizeFirstLetter = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
};

export const getWeatherInCurrentLocation = (getWeatherByCoord) => {
    navigator.geolocation.getCurrentPosition(function(position) {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        getWeatherByCoord(lat, lon);
    });
};

export const saveCityToLocalStorage = (city) => {
    localStorage.setItem('city', JSON.stringify(city));
};

export const getCityFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('city') || '{}');
};