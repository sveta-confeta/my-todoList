import React from 'react';
type ButtonPropsType={
    name:string
    callback:()=>void
}

export const Button = (props:ButtonPropsType) => {
    const onClickHandler=()=>{
        props.callback() }
    const error = props.name ? 'class': ''
    return (
      <button onClick={onClickHandler} className={error}>
          {props.name === 'x' ? 'Icon Dash' : props.name}
      </button>
    );
};
// function (name)=>{
//     switch (name)
//     case 'x' {return 'Icon'}
//
//
// }
