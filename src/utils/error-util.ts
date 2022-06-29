import {AppActionsType, errorAppMessageAC, setAppStatusAC} from "../reducers/appReducer";
import {Dispatch} from "redux";
import {AxiosError} from "axios";

export const handleServerNetworkError = (err: AxiosError, dispatch: Dispatch<AppActionsType>) => {
    dispatch(setAppStatusAC({value:'failed'}))//крутилка отключилась
    dispatch(errorAppMessageAC({value:err.message ? err.message : 'Some error occurred'}))
}
