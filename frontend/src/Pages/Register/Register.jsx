import React, {useState} from 'react';
// import styles from './Register.module.css';

import StepPhone from '../Steps/StepPhone/StepPhone';
import StepOtp from '../Steps/StepOtp/StepOtp';
import StepAvatar from '../Steps/StepAvatar/StepAvatar';
import StepDetails from '../Steps/StepDetails/StepDetails';

const steps = {
    1: StepPhone,
    2: StepOtp,
    3: StepAvatar,
    4: StepDetails
}

const Register = () => {
    const [stepNo, setStepNo] = useState(1);
    const Step = steps[stepNo];

    function onNext() { 
        setStepNo(prev => prev + 1);
    }
    
    return (
        <div>
            <h1>Register</h1>
            <Step onNext={onNext}/>
        </div>
    )
}

export default Register;