import React from "react";

import './Input.css'

const Input = props => {
    return (
        <React.Fragment>
            <div
                className={`control ${props.isValid===false?'invalid':''}`}
            >
                <label for={props.id}>{props.text}</label>
                <input type={props.type} id={props.id} onChange={props.onChange} onBlur={props.onBlur} value={props.value} />
            </div>
        </React.Fragment>
    );
}

export default Input;