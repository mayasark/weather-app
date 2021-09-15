import React from 'react';
import {connect} from 'react-redux';

import './weather.css';
import img from './img.png';

import sun from './weather-icons/sun.png';
import cloud from './weather-icons/cloud.png';
import rain from './weather-icons/rain.png';
import storm from './weather-icons/storm.png';
import partly from './weather-icons/partly-cloudy.png';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

const measures = [ 'Ветер', 'Давление', 'Влажность', 'Вероятность дождя' ];
const cities = [ 'Астрахань', 'Воронеж', 'Иркутск', 'Калининград', 'Мурманск', 'Томск'];

const Weather = ({cityWeather}) => {

    const {  name, weather, main, wind } = cityWeather;

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

    return (
        <div className="main">
            <div className="city">
                <div>
                    <div className="city-name"> Омск </div>
                    <div className="city-change">
                        <span
                            ref={anchorRef}
                            aria-controls={open ? 'menu-list-grow' : undefined}
                            aria-haspopup="true"
                            onClick={handleToggle}
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
                                                    <MenuItem onClick={handleClose}> {city} </MenuItem>
                                                ))}
                                            </MenuList>
                                        </ClickAwayListener>
                                    </Paper>
                                </Grow>
                            )}
                        </Popper>
                        <span>
                            <img className="img-plane" src={img} alt="location"/>
                            Мое местоположение
                        </span>
                    </div>
                </div>
                <div className="c-f">
                    <div className="gradus">°</div>
                    <div className="c-f-btn" >
                        <button className="c-btn">C</button>
                        <button className="f-btn">F</button>
                    </div>
                </div>
            </div>
            <div className="degrees-center">
                <div className="degrees">
                    <img className="weather-icon" src={sun} alt="icon"/>
                    <div className="current-degrees"> {main.temp}° </div>
                </div>
                <div className="weather-text-info"> {weather.description} </div>
            </div>

            <div className="segment">
                {measures.map( measure => (
                <div className="purport">
                    <div className="purport-centre">
                            <div className="nominal"> {measure} </div>
                            <div className="value">лала</div>
                    </div>
                </div>
                ))}
            </div>

        </div>

    )
}
export default connect(Weather);
