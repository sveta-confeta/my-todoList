import React, {useEffect} from 'react';
import './App.css';


import {Route, Routes} from "react-router-dom"
import {Login} from "../components/Login/Login";
import {CreateTodolists} from "../CreateTodolists";
import {initializeAppTC} from "../reducers/appReducer";

import {useAppDispatch, useAppSelector} from "../redux/redux-store";
import CircularProgress from "@mui/material/CircularProgress";
import {logautTC} from "../reducers/authReducer";
import {Button} from "@mui/material";


function App() {
    //const dispatch=useDispatch<ThunkDispatch<AppRootStateType,any,AnyAction>>();
    const dispatch = useAppDispatch();

    const isIniatialize = useAppSelector<boolean>(state => state.app.isInitialized);
    const isLogin = useAppSelector<boolean>(state => state.auth.isLoggedIn);

    useEffect(() => {
        dispatch(initializeAppTC()) //get запрос залогинена я или нет

    }, []) //1 раз нужно получить тодолисты
    console.log(isLogin)
    if (!isIniatialize) {
        return <CircularProgress disableShrink/> //покажи крутилку
    }
    const logautHandler = () => {
        dispatch(logautTC());
    }

    return (
        <div className="App">
            <div className={"header"}>
                {isLogin && <Button variant="contained" onClick={logautHandler} className={"btnHeader"}>Logaut</Button>}
            </div>
            <Routes>
                <Route path="/" element={<CreateTodolists/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path='*' element={<h1>404 page not found</h1>}/>

            </Routes>
        </div>

    );
}

export default App;
