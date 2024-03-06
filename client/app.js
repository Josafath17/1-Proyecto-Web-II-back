import './App.scss';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Components/Home/Home';
import Login from './Components/HomeLogin/HomeLogin';
import React, { createContext, useState } from 'react';
import PagePost from './Components/PagePost/PagePost';
import Category from './Components/Category/Category';
import AboutUs from './Components/About_Us/About_Us';

const AppContext = createContext();

export { AppContext };

function App() {

  const [logeado, setLogeado] = useState(localStorage.getItem('token'));

  return (
    <BrowserRouter>
      <div className="App">
        <div className="Components">
          <Routes>
            <Route path="/" element={logeado ? <Navigate to="/Home" /> : <Navigate to="/Login" />} />
            <Route path="/Login" element={
              <AppContext.Provider value={{ logeado, setLogeado }}>
                <Login />
              </AppContext.Provider>
            } />
            <Route path="/Home" element={
              logeado ? (
                <AppContext.Provider value={{ logeado, setLogeado }}>
                  <Home />
                </AppContext.Provider>
              ) : (<Navigate to="/" />)
            } />
            <Route path="/AboutUS" element={<AppContext.Provider value={{ logeado, setLogeado }}>
              <AboutUs />
            </AppContext.Provider>} />
            <Route path="/Post/:postId" element={<AppContext.Provider value={{ logeado, setLogeado }}>
              <PagePost />
            </AppContext.Provider>} />
            <Route path="/Category/:tag" element={<AppContext.Provider value={{ logeado, setLogeado }}>
              <Category />
            </AppContext.Provider>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;