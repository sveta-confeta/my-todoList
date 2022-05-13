export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType
}
//если статус 'loading' показываем крутилку
    // если статус 'idle', 'succeeded' | 'failed' -прячем крутилку

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        default:
            return state
    }
}

export const setAppStatusAC=(status:RequestStatusType)=>({type :'APP/SET-STATUS', status,} as const);

type ActionsType = ReturnType<typeof setAppStatusAC>

