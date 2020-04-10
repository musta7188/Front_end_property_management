import React, {useState, useEffect} from 'react';
import './App.css';

function Todo({name}){
  return(
    <h2>TODO LIST {name}</h2>
  )
}
export default function App() {
  const [value, setValue] = useState(1);
  const [name, setName] = useState('alex');

  useEffect(() => {
    console.log('initialite and update')
    
  },[name])

  return (
    <div>
      <h1>{value}</h1>
      <Todo name={name}/>
    </div>
  )
}

