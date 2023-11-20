import React, { useState,useEffect } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

const Home = () => {
  const apikey="a3669d619561edfdd2047ee7bf107065";
  const [data, setData] = useState({});
  const [inputcity, setInputCity] = useState("");

  

  const getWeatherDetails=(cityName)=>{
    if(!cityName) return
    const apiURL="https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+apikey;
    axios.get(apiURL).then((res)=>{
      setData(res.data);
    }).catch((err)=>{
      console.log("error",err)
    })
  }

  const inputchange =(e)=>{
    setInputCity(e.target.value)
  }

  const handlesearch =()=>{
    getWeatherDetails(inputcity)
  }
   
  useEffect(() => {
    getWeatherDetails("delhi")
    }
  , [])
   

  return (
    <div className="col-md-12">
    <div className="weatherBg">
      <h1  className="heading">Weather App</h1>

      <div className="d-grid col-4 mt-4 gap-3">
      <input type="text" className="form-control input-lg " 
     value={inputcity} onChange={inputchange}/>
      <button type="button" className="btn btn-primary" onClick={handlesearch}
      >Search</button>
      </div>
    {Object.keys(data).length>0 &&
      <div className="col-md-12 text-center mt-5">
        <div className="shadow-lg rounded  weatherResultBox">
            <img alt='not found'
            className="weatherIcon"
            src="https://cdn-icons-png.flaticon.com/512/4052/4052984.png"/>
            <h5 className="weatherCity"> {data?.name}  </h5>
            <h6 className="weatherTemp"> {((data?.main?.temp)-273.15).toFixed(2)} °C </h6>
        </div>
      </div>
      }

    </div>
  </div>
  )
}

export default Home