import React, {useState, useEffect, useRef} from 'react';
import classnames from 'classnames';
import _ from 'lodash/fp';

import './weather.css';
import { service } from "../../services/service";

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import location from './icons/location.png';
import { getWeatherInCurrentLocation, weatherIcon, cardinalPoints, toCelsius, capitalizeFirstLetter, getCityFromLocalStorage, saveCityToLocalStorage } from "./utils";

const measures = [
    {field:'Ветер', value: 'wind.speed', unit: ' м/с, ', unit2: 'wind.deg'},
    {field: 'Давление', value: 'main.pressure', unit: ' мм рт.ст.'},
    {field: 'Влажность', value: 'main.humidity', unit: '%'},
    {field: 'Вероятность дождя', value: 'clouds.all', unit: '%'}
    ];

const cities = [ 'Астрахань', 'Воронеж', 'Иркутск', 'Калининград', 'Мурманск', 'Москва', 'Томск'];

const Weather = () => {

    const [city, setCity] = useState(getCityFromLocalStorage());

    const [open, setOpen] = useState(false);

    const [celsius, setCelsius] = useState(true);

    const anchorRef = useRef(null);

    const handleSetCity = (newCity) => {
        setCity(newCity);
        saveCityToLocalStorage(newCity);
    };

    const getWeatherByName = (cityName) => {
        if (cityName) {
            service.getWeatherByName(cityName).then((res) => {
                handleSetCity({...res, name: cityName});
            });
        }
    };

    const getWeatherByCoord = (lat, lon) => {
        if (lat && lon) {
            service.getWeatherByCoord(lat, lon).then((res) => {
                handleSetCity(res);
            });
        }
    };

    const handleGetWeatherInCurrentLocation = () => {
        getWeatherInCurrentLocation(getWeatherByCoord);
    };

    useEffect(() => {
        handleGetWeatherInCurrentLocation();
    }, []);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event, cityName) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
        getWeatherByName(cityName);
    };

    const handleListKeyDown = (event) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    };

    const prevOpen = useRef(open);

    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

    return (
        <div className="main">
            <div className="city">
                <div>
                    <div className="city-name"> {city.name} </div>
                    <div className="city-change">
                        <span
                            ref={anchorRef}
                            aria-controls={open ? 'menu-list-grow' : undefined}
                            aria-haspopup="true"
                            onClick={handleToggle}
                            className="cursor"
                        >
                            Сменить город
                        </span>
                        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                            {({ TransitionProps, placement }) => (
                                <Grow
                                    {...TransitionProps}
                                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                >
                                    <Paper>
                                        <ClickAwayListener onClickAway={handleClose}>
                                            <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                                {cities.map( city => (
                                                    <MenuItem onClick={e => handleClose(e, city)}> {city} </MenuItem>
                                                ))}
                                            </MenuList>
                                        </ClickAwayListener>
                                    </Paper>
                                </Grow>
                            )}
                        </Popper>
                        <span
                            className="cursor"
                            onClick={handleGetWeatherInCurrentLocation}
                        >
                            <img className="img-plane" src={location} alt="location"/>
                            Мое местоположение
                        </span>
                    </div>
                </div>
                <div className="c-f">
                    <div className="gradus">°</div>
                    <div className="c-f-btn" >
                        <button
                            className= {classnames('c-btn', {'c-btn-clicked': (celsius) })}
                            onClick={() => setCelsius(true)}
                        >
                            C
                        </button>
                        <button
                            className= {classnames('f-btn', {'f-btn-clicked': (!celsius) })}
                            onClick={() => setCelsius(false)}
                        >
                            F
                        </button>
                    </div>
                </div>
            </div>
            <div className="degrees-main">
                <div className="degrees">
                    <img className="weather-icon" src={weatherIcon(city?.weather?.[0]?.main)} alt="icon"/>
                    <div className="current-degrees"> {toCelsius(city.main?.temp, celsius)}° </div>
                </div>
                <div className="weather-text-info">
                    {city?.weather?.[0]?.description
                        ? capitalizeFirstLetter(city.weather[0].description)
                        : ''
                    }
                </div>
            </div>

            <div className="segment">
                {measures.map( measure => (
                <div className="purport">
                    <div className="purport-centre">
                            <div className="nominal"> {measure.field} </div>
                            <span className="value">{Math.floor(_.get(measure.value, city))}</span>
                            <span className="value">{measure.unit}</span>
                            <span className="value">{cardinalPoints(_.get(measure.unit2, city))}</span>
                    </div>
                </div>
                ))}
            </div>
        </div>

    )
}
export default Weather;
