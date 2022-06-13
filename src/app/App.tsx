import React, {useEffect} from 'react';
import './App.css';


import {Routes} from "react-router-dom"
import {Login} from "../components/Login/Login";
import {CreateTodolists} from "../CreateTodolists";
import {Route} from "react-router-dom";
import {Navigate} from "react-router-dom";
import {initializeAppTC} from "../reducers/appReducer";

import { useAppDispatch, useAppSelector} from "../redux/redux-store";
import CircularProgress from "@mui/material/CircularProgress";
import {logautTC} from "../reducers/authReducer";




function App() {
    //const dispatch=useDispatch<ThunkDispatch<AppRootStateType,any,AnyAction>>();
    const dispatch=useAppDispatch();

    const isIniatialize=useAppSelector<boolean>(state => state.app.isInitialized);
    const isLogin=useAppSelector<boolean>(state => state.auth.isLoggedIn);

    useEffect(() => {
        dispatch(initializeAppTC()) //get запрос залогинена я или нет

    }, []) //1 раз нужно получить тодолисты

    if(!isIniatialize){
        return <CircularProgress disableShrink/> //покажи крутилку
    }
    const logautHandler=()=>{
        dispatch(logautTC());
    }

    return (
        <div className="App">
            <div className={"header"}>
                {isLogin && <button onClick={logautHandler} className={"btnHeader"}>Logaut</button>}
            </div>
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
