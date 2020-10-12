import React, { useEffect, useState } from 'react';
import './App.css';
import Chuck from './chuck.jpg';
import axios from 'axios';

function App() {

  const [state, setState] = useState({
    joke: '',
    searchKeyword: '',
    searchUrl: 'https://api.chucknorris.io/jokes/search?query='
  })

useEffect(  () => {
 fetchData();
}, [])

const fetchData = async () => {
  const result = await axios.get("https://api.chucknorris.io/jokes/random");
  setState({
    ...state,
    joke: result.data.value
  });
}

const searchJoke = (event) => {
setState ({
  ...state,
  searchKeyword: event.target.value
})
}

const fetchMyJoke = async () => {
  const result = await axios.get(state.searchUrl + state.searchKeyword)

  const jokePosition = Math.floor(Math.random()*result.data.result.length + 1)

  setState ({
    ...state,
    joke: result.data.result[jokePosition].value
  })
}

  return ( 
    <div className="container">
      <div className="row">
        <div className="col-6">
        <h1 className="title">Chuck Norris API</h1>
        <img src={Chuck} alt=""/>
        </div>

        <div className="col-6 searchJokeCol">
          <div className="card">
            <div className="card-header">
            
              <span>Search for a word</span>
            </div>
            <div className="card-body">
              <input type="text" onChange = {searchJoke}
                />
            </div>
          </div>
<div>
  <button onClick = {fetchMyJoke} className="btn btn-warning btn-lg">Generate a Joke</button>
</div>

        </div>
      </div>
      
      <h2 className="subTitle">Here is the  Joke</h2>
      <h4>{state.joke}</h4>
      <h4>{state.searchKeyword}</h4>
    </div>
  );
}
export default App;