import React from 'react';
import './Input.css';
import closeIcon from '../../assets/icons/close.png';

const Input = ({ type, placeholder, className, value, onInput, clearable }) => (
    <div className="input-container">
        <input type={type} placeholder={placeholder} className={`input ${className}`} value={value} onInput={(e) => onInput(e.target.value)} />
        {
            clearable && (
                <button type="reset" className="input__cancel-btn">
                    <img className="input__cancel-icon" src={closeIcon} />
                </button>
            )
        }
    </div>
)

export default Input;