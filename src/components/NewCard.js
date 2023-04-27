import React from 'react'
import "./Card.css";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
// importing react modal
import Modal from 'react-modal';
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background: "transparent",
        padding: "0",
        borderRadius: "3rem",
        border: "3px solid #899494",
        boxShadow: " 0px 0px 40px #99908f",
        height :"32rem",
        width:"34rem"
    },
    overlay: {
        backgroundColor: "#012c2dc9",
    }
};

export default function NewCard(props) {
    const { data } = props;
    console.log(data)
    let max_temp = 0, min_temp = 100;
    for (let i = 0; i < data.value.length; i++) {
        if (data.value[i].main.temp_max > max_temp) max_temp = data.value[i].main.temp_max;
        if (data.value[i].main.temp_min < min_temp) min_temp = data.value[i].main.temp_min;
    }

    // modal part 
    let subtitle=null;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModal() {
        setIsOpen(true);
    }
    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        if(subtitle)subtitle.style.color = '#f00';
    }
    function closeModal() {
        setIsOpen(false);
    }
    // modal part

    return (
        <div className='card'>
            <h1>{data.key}</h1>

            <div className="cardData">
                <span className="temperature">{(max_temp).toFixed(2)}℃</span>
                <span className="temperature"><img src={`https://openweathermap.org/img/wn/${data.value[0].weather[0].icon}@2x.png`} alt="loding..." /></span>
                <span className="temperature temp_min">{(min_temp).toFixed(2)}℃</span>
                <h3>{data.value[0].weather[0].description} </h3>
            </div>

            <div className='wind'><h1>{data.value[0].wind.speed} km/h</h1> <div style={{
                transform: `rotate(${data.value[0]
                    .wind.deg}deg)`
            }}><BsFillArrowUpCircleFill size={20} style={{ margin: "0.3rem" }} /></div></div>

            <button className="btn-lite" onClick={openModal}>Hourly Forecast of {data.key}</button>

            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                {data.value.map(e => {
                    return (<div className='modalCards'>
                        <h1>Time : {e.dt_txt.split(" ")[1]}</h1>

                        <div className="cardData">
                            <span className="temperature">{(e.main.temp_max).toFixed(2)}℃</span>
                            <span className="temperature"><img src={`https://openweathermap.org/img/wn/${e.weather[0].icon}@2x.png`} alt="loding..." /></span>
                            <span className="temperature temp_min">{(e.main.temp_min).toFixed(2)}℃</span>
                            <h3>{e.weather[0].description} </h3>
                        </div>

                        <div className='wind'><h1>{e.wind.speed} km/h</h1> <div style={{
                            transform: `rotate(${e
                                .wind.deg}deg)`
                        }}><BsFillArrowUpCircleFill size={20} style={{ margin: "0.3rem" }} /></div></div>
                    </div>)
                })}

            </Modal>

        </div>
    )
}
