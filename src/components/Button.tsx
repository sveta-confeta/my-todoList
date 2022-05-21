import React from 'react';
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {RequestStatusType} from "../reducers/appReducer";

type ButtonPropsType={
    name:string
    callback:()=>void
    disabledStatus?:RequestStatusType
}

export const ButtonForm = (props:ButtonPropsType) => {
    const onClickHandler=()=>{
        props.callback() }
    return (
        props.name === 'x' ?
        <IconButton disabled = {props.disabledStatus==='loading'}
                    aria-label="delete" onClick={onClickHandler} style={{minHeight:'10px',maxWidth:'10px' }} ><Delete/> </IconButton> :
             <Button   variant="contained" style={{maxWidth: '37px', minHeight: '38px', minWidth: '37px', maxHeight: '38px'}}
                     color="success" onClick={onClickHandler}>{props.name}</Button>
    );
};

