import React, { useState, useEffect } from 'react'
import axios from "axios"
import Scheduler from './components/Scheduler';


function App() {
  const [users, setUsers] = useState("");
  console.log({ users });
  const user = users.length > 0 ? users[0] : "";
  useEffect(() => {
    axios.get("http://localhost:3001/users")
      .then(res => setUsers(res.data))
      .catch(e => console.log(e))
  }, [])
  return (
    <div className="app">
      <Scheduler user={user} />

    </div>
  );
}

export default App;
