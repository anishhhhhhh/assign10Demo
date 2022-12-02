import {useEffect, useState} from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

const apiKey = "7e645c5e4585ced4f48d0c5bcfc758c3";

const App = () => {

  const [name, setName] = useState();
  const [data, setData] = useState([]);
  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const onSearch = (e) => {
    const city = e.target.value;
    setName(city);
  }

  const onSubmit = () => {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5&appid=${apiKey}`)
      .then(res => res.json())
      .then(data => {
        // console.log(data[0].lat);
        // console.log(data[0].lon);
        // fetch(`https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${data[0].lat}&lon=${data[0].lon}&appid=${apiKey}`)
        //   .then(res => res.json())
        //   .then(data => {
        //     console.log(data);
        //   })

        fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&appid=${apiKey}`)
          .then(newRes => newRes.json())
          .then(newData => {
            setData(newData.list);
          })
        })
  }

  return (
      <div className="App">
        <div className="header">
          <input type='text' name='search' onChange={onSearch}/>
          <button onClick={onSubmit}>Submit</button>
          </div>
          
                <div className="weekDiv">
                  {data.length != 0 && weekDays.map((day, index) => {
                    return (
                      <div key={index}>
                      {/* <Route path={`/${day}`} component={Day}/> */}
                      <p>{day}</p>
                    </div>
                  )
                  })}
                </div>

        <div className="tempData">
          {data.slice(0, 5).map((item, index) => {
            return (
              <div key={index}>
                {console.log(item.weather[0].icon)}
                <img src={"http://openweathermap.org/img/wn/" +item.weather[0].icon + "@2x.png"}></img>
                <p>Max: {(item.main.temp_max - 273.15).toFixed(2)}°C</p>
                <p>Min: {(item.main.temp_min - 273.15).toFixed(2)}°C</p>
              </div>
            )
          })}
        </div>
        <div>
        </div>
      </div>
  );
}

export default App;