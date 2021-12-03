import './App.css';
import React, { useState } from 'react';

function App() {
  const [inputState, setInputState] = useState("");
  const [outputState, setOutputState] = useState([]);

  function getData(event) {
    setInputState(event.target.value)
    clear()
    throttle(async () => {
      const url = `https://itunes.apple.com/search?term=${event.target.value}`
      fetch(url)
      .then(response => response.json())
      .then(data => {
          const nextData = data.results.map((d) => `${d.artistName} ::  ${d.trackName}`)
          setOutputState(nextData)
      });
    }, 500)
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <br/>
        <input type="text" value={inputState} onChange={getData} />
        <br/>
        <div>input: {inputState}</div>
        <br/>
        <div>output: {outputState.map((n) => <div key={Math.random()}>{n}</div>)}</div>
      </header>
    </div>
  );
}

let timeout

function clear() {
  return timeout === undefined ? null : clearTimeout(timeout)
}

function throttle(fn, ms) {
  function exec() { fn.apply() }
  if(fn !== undefined && ms !== undefined) { timeout = setTimeout(exec, ms) } 
  else { console.error('callback function and the timeout must be supplied') }
}

export default App;
