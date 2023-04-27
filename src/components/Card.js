import React from 'react'
import "./Card.css";
// import { BsFillArrowUpCircleFill } from "react-icons/bs";

export default function Card(props) {
    // const { data } = props;
    // const convertDate = (e) => {
    //     let date = new Date(e);
    //     // let day=`${date.toString()[0]}${date.toString()[1]}${date.toString()[2]}day`;
    //     let time = date.toTimeString();
    //     let hr;
    //     if (parseInt(`${time[0]}${time[1]}`) > 12) hr = (parseInt(`${time[0]}${time[1]}`) - 12).toString();
    //     return ` ${hr} : ${time[3]}${time[4]} : ${time[6]}${time[7]} s`
    // }
    // const makeDate=(date)=>{
    //     return `${date[8]}${date[9]} - ${date[5]}${date[6]} - ${date[0]}${date[1]}${date[2]}${date[3]}`
    // }

    return (
        <div className='card'>
            {/* <h1>{makeDate(data.dt_txt)}</h1>
            <h1>{convertDate(data.dt)}</h1>
            <div className="cardData">
                <span className="temperature">{(data.main.temp).toFixed(3)}℃</span>
                <span className="temperature"><img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="loding..." />
                </span> <span className="temperature">{data.weather[0].main} </span>
                <h3>{data.weather[0].description} </h3>
            </div>

            <div className='wind'><h1>{data.wind.speed} km/h</h1> <div style={{
                            transform: `rotate(${data
                                .wind.deg}deg)`
                        }}><BsFillArrowUpCircleFill size={20} style={{margin:"0.3rem"}}/></div></div> */}

        </div>
    )
}
