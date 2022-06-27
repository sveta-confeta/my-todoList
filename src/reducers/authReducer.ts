import {Dispatch} from "redux";
import {errorAppMessageAC, setAppStatusAC} from "./appReducer";
import {authAPI, LoginParamsType, todolistApi} from "../api/ todolist-api";
import {AxiosError} from "axios";
import {handleServerNetworkError} from "../utils/error-util";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";



const initialState = {
    isLoggedIn: false //сразу мы не залогинены
}
const slice=createSlice({
    name:'auth',
    initialState:initialState,
    reducers:{
        setIsLoggedInAC(state,action:PayloadAction<{value:boolean}>){
            state.isLoggedIn=action.payload.value
}
    }

});

export const authReducer=slice.reducer;
export const setIsLoggedInAC=slice.actions.setIsLoggedInAC;

// export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
//     switch (action.type) {
//         case 'login/SET-IS-LOGGED-IN':
//             return {...state, isLoggedIn: action.value}
//         default:
//             return state
//     }
// }
// actions
//export const setIsLoggedInAC = (value: boolean) =>
  //  ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data:LoginParamsType) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading')) //крутилка вкл
        authAPI.login(data)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(setAppStatusAC('failed')) //крутилка выкл
                    dispatch(setIsLoggedInAC({value:true}));
                } else {
                    dispatch(setAppStatusAC('failed'))
                    dispatch(errorAppMessageAC(res.data.messages[0])); //достаем из массива сообщение об ошибке
                }
            })
            .catch((err: AxiosError) => {
                handleServerNetworkError(err, dispatch)
            })
    };
}

export const logautTC = () => {  //санка вылогинивания
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading')) //крутилка вкл
        authAPI.logaut()
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(setAppStatusAC('failed')) //крутилка выкл
                    dispatch(setIsLoggedInAC({value:false}));
                } else {
                    dispatch(setAppStatusAC('failed'))
                    dispatch(errorAppMessageAC(res.data.messages[0])); //достаем из массива сообщение об ошибке
                }
            })
            .catch((err: AxiosError) => {
                handleServerNetworkError(err, dispatch)
            })
    };
}


// types
type ActionsType = ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setAppStatusAC> //крутилка
    | ReturnType<typeof errorAppMessageAC> //ошибка

