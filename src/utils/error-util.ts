import {AppActionsType, errorAppMessageAC, setAppStatusAC} from "../reducers/appReducer";
import {Dispatch} from "redux";

export const handleServerNetworkError = (err: {message: string}, dispatch: Dispatch<AppActionsType>) => {
    dispatch(setAppStatusAC('failed'))//крутилка отключилась
    dispatch(errorAppMessageAC(err.message))
}
