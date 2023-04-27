import React, { useState, useEffect } from 'react'
import "./Weather.css"
import morning from "../doc/morning.mp4";
import dawn from "../doc/dawn.mp4";
import afternoon from "../doc/afternoon.mp4";
import night from "../doc/night.mp4";
import low_temp from "../doc/low_temp.png"
import high_temp from "../doc/high_temp.png"
import pressur from "../doc/pressur.png"
import humudity from "../doc/humidity.png"
import sea_level from "../doc/water_level.png"
import ground_lvl from "../doc/grnd_level.png"
// import { FaSearchLocation } from "react-icons/fa";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { BiCurrentLocation } from "react-icons/bi";
import { AiOutlineArrowLeft } from "react-icons/ai";
// import Card from './Card';
import NewCard from './NewCard';



export default function Weather() {

    // changing the background according to the time 
    const [bgVdo, setBgVdo] = useState(null);
    setTimeout(() => {
        let date = new Date();
        let houre = date.getHours();
        if (houre >= 0 && houre < 6) setBgVdo(dawn);
        if (houre < 12 && houre >= 6) setBgVdo(morning);
        if (houre >= 12 && houre < 18) setBgVdo(afternoon);
        if (houre >= 18) setBgVdo(night);

    }, 10);

    // all react hooks are here
    const [city, setCity] = useState(null);
    const [search, setSearch] = useState(" ");
    const [dayforecast, setdayForecast] = useState({});

    // setting the daywise 5day forcast convert
    const days = ["Monday ", "Tuesday ", "Wednesday ", "Thursday ", "Friday ", "Saturday ", "Sunday "];
    const calculateDayWiseForcast = (e) => {
        let dayWiseForcast = new Map();
        for (let forcast of e) {
            let [date] = forcast.dt_txt.split(" ");
            let dayOfTheWeak = days[new Date(date).getDay()];
            //   console.log(dayOfTheWeak)
            if (dayWiseForcast.has(dayOfTheWeak)) {
                let prevForcast = dayWiseForcast.get(dayOfTheWeak);
                prevForcast.push(forcast);
                dayWiseForcast.set(dayOfTheWeak, prevForcast);
            }
            else {
                dayWiseForcast.set(dayOfTheWeak, [forcast]);
            }
        }
        return dayWiseForcast;
    }
    let arrayData=null;
    if (city && dayforecast && dayforecast.list) {
        let mappedData = calculateDayWiseForcast(dayforecast.list);
        // console.log(mappedData);
        // converting map to array
        arrayData=Array.from(mappedData,([key,value])=>({key, value}));
    }




    const convertDate = (e) => {
        let date = new Date(e);
        let day = days[date.getDay()-1];
        let time = date.toTimeString();
        let hr;
        if (parseInt(`${time[0]}${time[1]}`) > 12) hr = (parseInt(`${time[0]}${time[1]}`) - 12).toString();
        else hr = (parseInt(`${time[0]}${time[1]}`)).toString();
        return `${day} | ${hr} : ${time[3]}${time[4]} : ${time[6]}${time[7]} s`
    }
    setInterval(() => {
        let time = convertDate(Date.now());
        if (time && city) {
            let timer = document.querySelector("#timer");
            if (timer) timer.textContent = time;
        }
    }, 1000);

    // location setting
    const check_location = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(setPosition);
        }
    }
    const setPosition = (position) => {
        //    setLat(position.coords.latitude);
        //    setLong(position.coords.longitude);
        const fetch_apis = async () => {
            let url_of_weather = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=a593e2c9d6050a4322c0f4b50c0f5f02`;

            let weather_responce = await fetch(url_of_weather);
            // console.log(weather_responce);
            let json_weather = await weather_responce.json();
            // console.log(json_weather);
            setSearch(json_weather.name);
            url_of_weather = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=a593e2c9d6050a4322c0f4b50c0f5f02&units=metric`;
            weather_responce = await fetch(url_of_weather);
            // console.log(weather_responce);
            json_weather = await weather_responce.json();
            // console.log(json_weather);
            if (json_weather.cod === "404") {
                setCity(null);
            } else {
                setCity(json_weather);
            }

            // for the 5 days forcast
            fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${search}&appid=a593e2c9d6050a4322c0f4b50c0f5f02&units=metric`).then(jsonData => jsonData.json()).then(data => setdayForecast(data));

            // settign the search value to the pointed location value
            document.querySelector(".search").value = search;

        }
        fetch_apis();
    }

    useEffect(() => {
        const fetch_api = async () => {
            const url_of_weather = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=a593e2c9d6050a4322c0f4b50c0f5f02&units=metric`;
            const weather_responce = await fetch(url_of_weather);
            // console.log(weather_responce);
            const json_weather = await weather_responce.json();
            // console.log(json_weather);
            if (json_weather.cod === "404") {
                setCity(null);
            } else {
                setCity(json_weather);
            }

            // for the 5 days forcast
            fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${search}&appid=a593e2c9d6050a4322c0f4b50c0f5f02&units=metric`).then(jsonData => jsonData.json()).then(data => setdayForecast(data));
        }
        fetch_api();
    }, [search])
    //    console.log(city)

    const check_city = (event) => {
        if (event.target.value === "") {
            setSearch(" ");
        } else {
            setSearch((event.target.value).charAt(0).toUpperCase() + (event.target.value).slice(1));
        }
        // console.log(typeof(event.target.value))
    }

    return (
        <div className='main_body'>
            <video src={bgVdo} className='bg_vdo' autoPlay loop muted></video>
            <h2>SpinoTech WEATHER APP</h2>
            <div className="container">

                <div className="input">
                    <input type="search" className='search' placeholder='Enter The Location' onChange={check_city} />
                    <button className='btn' onClick={check_location}><BiCurrentLocation size={20} /> </button>
                    <AiOutlineArrowLeft size={20} />
                    <h2>Locate You</h2>
                </div>
                {!city ? (<p style={{ fontSize: "2rem" }}>No Data Found</p>) : (
                    <div className="info">
                        <div className="location"><h1>{city.name}</h1> <img src={`https://openweathermap.org/img/wn/${city.weather[0].icon}.png`} alt="" /> {city.weather[0].main} </div>

                        {!city ? (<h1>No Data Found</h1>) : (<h3 className='temperature'>{(city.main.temp).toFixed(2)} ℃  /  {(((city.main.temp) * 1.8) + 32).toFixed(2)} °F</h3>)}

                        <div className="wind">
                            <h1>Lat : {city.coord.lat}</h1> <h1>Lon : {city.coord.lon}</h1>
                        </div>

                        <div className="wind">
                            <h1>Time :</h1><h1 id='timer'> </h1>
                        </div>

                        <div className='wind'><h1>Wind Speed : </h1>   <h1>{city.wind.speed} km/h</h1> <div style={{
                            transform: `rotate(${city
                                .wind.deg}deg)`
                        }}><BsFillArrowUpCircleFill size={30} /></div></div>

                        <div className="about-info">
                            <div className="wether-info">{!city ? (<h3>No Data</h3>) : (<> <img src={low_temp} alt="" /> <h3>{(city.main.temp_min).toFixed(2)} ℃</h3> <h3>Minimum Temperture</h3> </>)}</div>
                            <div className="wether-info">{!city ? (<h3>No Data</h3>) : (<> <img src={high_temp} alt="" /> <h3>{(city.main.temp_max).toFixed(2)} ℃</h3> <h3>Maximum Temperature</h3> </>)}</div>
                            <div className="wether-info">{!city ? (<h3>No Data</h3>) : (<> <img src={pressur} alt="" /> <h3>{!(city.main.pressure) ? "No Data" : (city.main.pressure / 1013).toFixed(3)} ATM</h3> <h3>Pressur</h3> </>)}</div>

                            <div className="wether-info">{!city ? (<h3>No Data</h3>) : (<> <img src={humudity} alt="" /> <h3>{!(city.main.humidity) ? "No Data" : (city.main.humidity)} %</h3> <h3>humidity</h3> </>)}</div>

                            <div className="wether-info">{!city ? (<h3>No Data</h3>) : (<> <img src={sea_level} alt="" /> <h3>{!(city.main.sea_level) ? "No Data" : (city.main.sea_level)}</h3> <h3>Sea Level</h3> </>)}</div>
                            <div className="wether-info">{!city ? (<h3>No Data</h3>) : (<> <img src={ground_lvl} alt="" /> <h3>{!(city.main.grnd_level) ? "No Data" : (city.main.grnd_level)}</h3> <h3>Ground Level</h3> </>)}</div>
                        </div>
                        <h1 className='heading'>5 days forecast</h1>
                        <div className="card-info">
                            {/* {dayforecast.list ? dayforecast.list.map(e => <Card data={e} key={e.dt} />) : ""} */}
                            {arrayData&& arrayData.map(e=>{
                               return <NewCard data={e} key={e.key}/>
                            })}
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}
