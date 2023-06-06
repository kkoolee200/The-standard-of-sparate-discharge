/* eslint-disable */
import React from 'react';
import Main from './main';
import Necessity from './necessity';
import Login from './login';
import Search from './method_search';
import Method from './method_method';
import Game from './method_game';
import Map from './map_map';
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className='all'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/loginPage' element={<Login />} />
          <Route path='/necessityPage' element={<Necessity />} />
          <Route path='/methodPage' element={<Method />} />
          <Route path='/searchPage' element={<Search />} />
          <Route path='/gamePage' element={<Game />} />
          <Route path='/mapPage' element={<Map />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;