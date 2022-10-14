import React from 'react';
import styles from './StepPhone.module.css';


const StepPhone = ({onNext}) => {
    return (
        <>
            <div>StepPhone</div>
            <button onClick={onNext}>Send OTP</button>
        </>
    )
}

export default StepPhone;