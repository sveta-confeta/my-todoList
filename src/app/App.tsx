import React from 'react';
import './App.css';


import {Routes} from "react-router-dom"
import {Login} from "../components/Login/Login";
import {CreateTodolists} from "../CreateTodolists";
import {Route} from "react-router-dom";
import {Navigate} from "react-router-dom";


function App() {

    return (
        <div className="App">
            <Routes>
                <Route path='/' element={<CreateTodolists/>}/>
                <Route path='login' element={<Login/>}/>
                <Route path='404' element={<h1>404 page not foun</h1>}/>
                <Route path='*' element={<Navigate to ='/404'/>}/>

            </Routes>
        </div>

    );
}

export default App;
