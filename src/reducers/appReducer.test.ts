import {appReducer, errorAppMessageAC, RequestStatusType, setAppStatusAC} from "./appReducer";
let startState:{
    status:RequestStatusType,
    error:string |null
}
beforeEach(()=>{
    startState={
        status: 'idle',
        error:null ,
    };
})

test ( 'set-status',()=> {

    const endState = appReducer(startState, setAppStatusAC('loading'))

    expect(endState.status).toBe('loading');

})

test ( 'error',()=>{

    const endState=appReducer(startState,errorAppMessageAC('error'))




    expect(endState.error).toBe( 'error');
})



