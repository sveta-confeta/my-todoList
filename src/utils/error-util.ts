import {AppActionsType, errorAppMessageAC, setAppStatusAC} from "../reducers/appReducer";
import {Dispatch} from "redux";
import {AxiosError} from "axios";

export const handleServerNetworkError = (err: AxiosError, dispatch: Dispatch<AppActionsType>) => {
    dispatch(setAppStatusAC('failed'))//крутилка отключилась
    dispatch(errorAppMessageAC(err.message ? err.message : 'Some error occurred'))
}
