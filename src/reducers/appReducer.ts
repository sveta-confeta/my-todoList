export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error:null as string |null
}
//если статус 'loading' показываем крутилку
    // если статус 'idle', 'succeeded' | 'failed' -прячем крутилку

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP-ERROR':
            debugger
            return {...state, error: action.error}

        default:
            return state
    }
}

export const setAppStatusAC=(status:RequestStatusType)=>({type :'APP/SET-STATUS', status,} as const);
export const errorAppMessageAC=(error:string| null)=>({type :'APP-ERROR', error,} as const);

export type AppActionsType = ReturnType<typeof setAppStatusAC>
|  ReturnType<typeof errorAppMessageAC>;
