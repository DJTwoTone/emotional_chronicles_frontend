import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { decode } from 'jsonwebtoken';

import UserContext from './UserContext';
import useLocalStorage from './hooks/useLocalStorage';
import ECApi from './ECApi';


import './App.css';

import Navigation from './Navigation';
import Routes from './Routes';
import { DateTime } from 'luxon';


export const LOCAL_STORAGE_TOKEN_ID = 'ec_token'

function App() {

  

  const [loggedInUser, setLoggedInUser] = useState(null);
  const [todaysEntry, setTodaysEntry] = useState(false);

  const [token, setToken] = useLocalStorage(LOCAL_STORAGE_TOKEN_ID)


  
  useEffect(() => {
    async function getLoggedInUser() {
      try {
        
        let { username } = decode(token);
        let fetchedUser = await ECApi.getUser(username);
        setLoggedInUser(fetchedUser)
        if (username) {
          let todayCheck = await ECApi.checkToday(username, DateTime.now().toISODate())
          setTodaysEntry(todayCheck.entered)
        }
      } catch (err) {
        setLoggedInUser(null);
        setTodaysEntry(false);
      }
    }
    getLoggedInUser();
    
  }, [token]);



  function handleLogout() {

    setLoggedInUser(null);
    setToken(null);
    setTodaysEntry(false);

  }


  return (
    <BrowserRouter>
      <UserContext.Provider value={{ loggedInUser, setLoggedInUser, todaysEntry, setTodaysEntry }}>
        <div className="App">
          <Navigation logout={handleLogout} />
          <Routes setToken={setToken}/>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
