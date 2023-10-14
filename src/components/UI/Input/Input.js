import React,{useImperativeHandle,useRef} from "react";

import './Input.css'

//imperative approach of allowing component and its functionality to be called or manipulate directly by parents
const Input = React.forwardRef((props,ref) => {
    const inputRef=useRef();
    const activate=()=>{
        inputRef.current.focus();
    }
    useImperativeHandle(ref,()=>{
        //this is the object which is exposed with parents so include all the functionality and value which you want to expose
        return {focus: activate};
    })
    return (
        <React.Fragment>
            <div
                className={`control ${props.isValid===false?'invalid':''}`}
            >
                <label for={props.id}>{props.text}</label>
                <input ref={inputRef} type={props.type} id={props.id} onChange={props.onChange} onBlur={props.onBlur} value={props.value} />
            </div>
        </React.Fragment>
    );
});

export default Input;