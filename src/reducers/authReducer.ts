import {Dispatch} from "redux";
import {errorAppMessageAC, setAppStatusAC} from "./appReducer";
import {authAPI, LoginParamsType, todolistApi} from "../api/ todolist-api";
import {AxiosError} from "axios";
import {handleServerNetworkError} from "../utils/error-util";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";



const initialState = {
    isLoggedIn: true //eсли false -сразу мы не залогинены, для просмотра другими людьми-пусть будет true
}

export const loginTC=createAsyncThunk('auth/Login',async (data:LoginParamsType,thunkAPI)=>{
    thunkAPI.dispatch(setAppStatusAC({value:'loading'})) //крутилка вкл
    try{
        const res=await authAPI.login(data);
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({value:'failed'})) //крутилка выкл
           return{isLoggedIn:true};
        } else {
            thunkAPI.dispatch(setAppStatusAC({value:'failed'}))
            thunkAPI.dispatch(errorAppMessageAC({value:res.data.messages[0]})); //достаем из массива сообщение об ошибке
            return{isLoggedIn:false};
        }
    }catch(err: any) {
            handleServerNetworkError(err, thunkAPI.dispatch)
        return {isLoggedIn:false};

        }
})


const slice=createSlice({
    name:'auth',
    initialState:initialState,
    reducers:{
        setIsLoggedInAC(state,action:PayloadAction<{value:boolean}>){
            state.isLoggedIn=action.payload.value
}
    },
    extraReducers:builder => {
        builder.addCase(loginTC.fulfilled,(state,action)=>{
            state.isLoggedIn=action.payload.isLoggedIn
        })
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


export const logautTC = () => {  //санка вылогинивания
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({value:'loading'})) //крутилка вкл
        authAPI.logaut()
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(setAppStatusAC({value:'failed'})) //крутилка выкл
                    dispatch(setIsLoggedInAC({value:false}));
                } else {
                    dispatch(setAppStatusAC({value:'failed'}))
                    dispatch(errorAppMessageAC({value:res.data.messages[0]})); //достаем из массива сообщение об ошибке
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

