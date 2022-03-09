import React, {ChangeEvent, useState,} from 'react';



type EditSpanPropsType={
    title:string;
    apdateTask:(title:string)=>void
}

const EditSpan = (props:EditSpanPropsType) =>{
    const[title,setTitle]=useState<string>(props.title); //для импута
    const[editMode,setEditMode]=useState<boolean>(false);//для редактирования
    const onChangeHandler=(event:ChangeEvent<HTMLInputElement>)=>{
        setTitle(event.currentTarget.value)
    }
    const onBlurHanter=()=>{
        props.apdateTask(title)
        setEditMode(false);
    }
    const onChangeDoubleClick=()=>{
        setEditMode(true);
    }



    return (
      editMode
          ? <input onChange={onChangeHandler} value={title} autoFocus onBlur={onBlurHanter}/>
        : <span onDoubleClick={ onChangeDoubleClick}>{props.title}</span>

    );
};

export default EditSpan;