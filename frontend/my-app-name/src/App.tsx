

import { useEffect } from 'react';
import './App.css'
import axios from 'axios';

function App() {
  useEffect(() => {
    axios.get('https://humble-spoon-7vw57694q592r4jp-3000.app.github.dev/api/diaries').then(response => {
      console.log(response.data);
    })
  }, [])

  return (
    <>
     <h1>home</h1>
    </>
  )
}

export default App
