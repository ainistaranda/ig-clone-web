import './App.css';
import Header from './components/Header';
import Feed from './components/Feed';
import { useState } from 'react'
import Login from './components/Login';



function App() {
  const [user,setUser] = useState()
  return (
    <main className="App">
      <Header/>
      <div className="App-header">
        {!user 
        ? <Login setUser={setUser} />
        :<Feed />
      }
      </div>
    </main>
  );
}

export default App;
