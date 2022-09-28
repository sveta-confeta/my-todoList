import {errorAppMessageAC, setAppStatusAC} from "./appReducer";
import {authAPI, LoginParamsType} from "../api/ todolist-api";
import {handleServerNetworkError} from "../utils/error-util";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState = {
    isLoggedIn: false //eсли false -сразу мы не залогинены
}

export const loginTC = createAsyncThunk('auth/Login', async (data: LoginParamsType, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({value: 'loading'})) //крутилка вкл
    try {
        const res = await authAPI.login(data);
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({value: 'failed'})) //крутилка выкл
            return;
        } else {
            thunkAPI.dispatch(setAppStatusAC({value: 'failed'}))
            thunkAPI.dispatch(errorAppMessageAC({value: res.data.messages[0]})); //достаем из массива сообщение об ошибке
            return thunkAPI.rejectWithValue({})
        }
    } catch (err: any) {
        handleServerNetworkError(err, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({})

    }
})

export const logautTC = createAsyncThunk('auth/logaut', async (param, thunkAPI) => {  //санка вылогинивания
        thunkAPI.dispatch(setAppStatusAC({value: 'loading'})) //крутилка вкл
        try {
            const res = await authAPI.logaut();
            if (res.data.resultCode === 0) {
                thunkAPI.dispatch(setAppStatusAC({value: 'failed'})) //крутилка выкл
                return;// если все хорошо то мы полюбому попадаем в екстраредьюссер фуллфилд
            } else {
                thunkAPI.dispatch(setAppStatusAC({value: 'failed'}))
                thunkAPI.dispatch(errorAppMessageAC({value: res.data.messages[0]})); //достаем из массива сообщение об ошибке
                return thunkAPI.rejectWithValue({}) //нужно вернуть хотьб и пустой обьект

            }
        }

        catch (err:any) {
            handleServerNetworkError(err, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({}) //нужно вернуть хотьб и пустой обьект
        }
}
)


const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedInAC(state,action:PayloadAction<{value:boolean}>){
            state.isLoggedIn=action.payload.value;
        }
    },
    extraReducers: builder => {
        builder.addCase(loginTC.fulfilled, (state) => {
            state.isLoggedIn =true;
        });
        builder.addCase(logautTC.fulfilled, (state) => {
            state.isLoggedIn =false;
        })
    }

});


export const authReducer = slice.reducer;
export const {setIsLoggedInAC}=slice.actions
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


// export const logautTC = () => {  //санка вылогинивания
//     return (dispatch: Dispatch) => {
//         dispatch(setAppStatusAC({value:'loading'})) //крутилка вкл
//         authAPI.logaut()
//             .then((res) => {
//                 if (res.data.resultCode === 0) {
//                     dispatch(setAppStatusAC({value:'failed'})) //крутилка выкл
//                     dispatch(setIsLoggedInAC({value:false}));
//                 } else {
//                     dispatch(setAppStatusAC({value:'failed'}))
//                     dispatch(errorAppMessageAC({value:res.data.messages[0]})); //достаем из массива сообщение об ошибке
//                 }
//             })
//             .catch((err: AxiosError) => {
//                 handleServerNetworkError(err, dispatch)
//             })
//     };
// }


// types
// type ActionsType =
//     | ReturnType<typeof setAppStatusAC> //крутилка
//     | ReturnType<typeof errorAppMessageAC> //ошибка

