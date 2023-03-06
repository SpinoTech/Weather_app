import React, { useState, useEffect } from 'react'
import "./Weather.css"
import vdo from "../doc/Apocalypse - 115081.mp4"
import morning from "../doc/morning.mp4";
import afternoon from "../doc/afternoon.mp4";
import night from "../doc/night.mp4";
import low_temp from "../doc/low_temp.png"
import high_temp from "../doc/high_temp.png"
import pressur from "../doc/pressur.png"
import humudity from "../doc/humidity.png"
import sea_level from "../doc/water_level.png"
import ground_lvl from "../doc/grnd_level.png"
import { FaSearchLocation } from "react-icons/fa";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import {BiCurrentLocation}from "react-icons/bi";
import {AiOutlineArrowLeft}from"react-icons/ai";


export default function Weather() {

    // changing the background according to the time 
    const [bgVdo, setBgVdo] = useState(vdo);
    setTimeout(() => {
        let date = new Date();
        let houre = date.getHours();
        if (houre < 12) setBgVdo(morning);
        if (houre >= 12 && houre < 18) setBgVdo(afternoon);
        if (houre >= 18) setBgVdo(night);

    }, 1000);

    // all react hooks are here
    const [city, setCity] = useState(null);
    const [search, setSearch] = useState("");
    // const [lat,setLat]=useState(null);
    

    // location setting
    const check_location=()=>{
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(setPosition);
          } 
    }
    const setPosition=(position)=>{
        //    setLat(position.coords.latitude);
        //    setLong(position.coords.longitude);
            const fetch_api = async () => {
                const url_of_weather = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=a593e2c9d6050a4322c0f4b50c0f5f02`;
    
                const weather_responce = await fetch(url_of_weather);
                // console.log(weather_responce);
                const json_weather = await weather_responce.json();
                // console.log(json_weather);
                setCity(json_weather);
            }
            fetch_api();
    }

    useEffect(() => {
        const fetch_api = async () => {
            // fetching the latitude and longitude of that location
            const url_of_location = `http://api.openweathermap.org/geo/1.0/direct?q=${search}&appid=a593e2c9d6050a4322c0f4b50c0f5f02`;

            const responce = await fetch(url_of_location);
            // console.log(responce);
            const json_responce = await responce.json();
            // console.log(json_responce);


            const url_of_weather = `https://api.openweathermap.org/data/2.5/weather?lat=${json_responce[0].lat}&lon=${json_responce[0].lon}&appid=a593e2c9d6050a4322c0f4b50c0f5f02`;

            const weather_responce = await fetch(url_of_weather);
            // console.log(weather_responce);
            const json_weather = await weather_responce.json();
            // console.log(json_weather);
            setCity(json_weather);
        }
        fetch_api();
    }, [search])
    //    console.log(city)

    const check_city = (event) => {
        setSearch((event.target.value).charAt(0).toUpperCase() + (event.target.value).slice(1));
        // console.log(typeof(event.target.value))
    }

    return (
        <div className='main_body'>
            <video src={bgVdo} className='bg_vdo' autoPlay loop muted></video>
            <div className="container">
                <h2>DEATH zONE WEATHER APP</h2>

                <div className="input">
                    <input type="search" className='search' placeholder='Enter The Location' onChange={check_city} />
                    <button className='btn' onClick={check_location}><BiCurrentLocation size={20}/> </button>
                    <AiOutlineArrowLeft size={20}/>
                    <h2>Locate You</h2>
                </div>
                {!city ? (<p style={{ fontSize: "2rem" }}>No Data Found</p>) : (
                    <div className="info">
                        <div className="location"> <i><FaSearchLocation size={30} /></i><h1>{!search?(city.name):search}</h1></div>

                        {!city ? (<h1>No Data Found</h1>) : (<h3 className='temperature'>{(city.main.temp - 273.15).toFixed(2)} ℃  /  {(((city.main.temp - 273.15) * 1.8) + 32).toFixed(2)} °F</h3>)}

                        <div className='wind'><h1>Wind Speed : </h1>   <h1>{city.wind.speed} km/h</h1> <div style={{
                            transform: `rotate(${city
                                .wind.deg}deg)`
                        }}><BsFillArrowUpCircleFill size={30} /></div></div>

                        <div className="about-info">
                            <div className="wether-info">{!city? (<h3>No Data</h3>) : (<> <img src={low_temp} alt="" /> <h3>{(city.main.temp_min - 273.15).toFixed(2)} ℃</h3> <h3>Minimum Temperture</h3> </>)}</div>
                            <div className="wether-info">{!city ? (<h3>No Data</h3>) : (<> <img src={high_temp} alt="" /> <h3>{(city.main.temp_max - 273.15).toFixed(2)} ℃</h3> <h3>Maximum Temperature</h3> </>)}</div>
                            <div className="wether-info">{!city ? (<h3>No Data</h3>) : (<> <img src={pressur} alt="" /> <h3>{!(city.main.pressure) ? "No Data" : (city.main.pressure / 1013).toFixed(3)} ATM</h3> <h3>Pressur</h3> </>)}</div>

                            <div className="wether-info">{!city ? (<h3>No Data</h3>) : (<> <img src={humudity} alt="" /> <h3>{!(city.main.humidity) ? "No Data" : (city.main.humidity)} %</h3> <h3>humidity</h3> </>)}</div>

                            <div className="wether-info">{!city ? (<h3>No Data</h3>) : (<> <img src={sea_level} alt="" /> <h3>{!(city.main.sea_level) ? "No Data" : (city.main.sea_level)}</h3> <h3>Sea Level</h3> </>)}</div>
                            <div className="wether-info">{!city ? (<h3>No Data</h3>) : (<> <img src={ground_lvl} alt="" /> <h3>{!(city.main.grnd_level) ? "No Data" : (city.main.grnd_level)}</h3> <h3>Ground Level</h3> </>)}</div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}
