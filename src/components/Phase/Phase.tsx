import React from 'react';
import './Phase.css';

interface PhaseProps {
    code?: string,
    // order: number
}

const Phase = ({code} : PhaseProps) => {


    return (<div className="phase">
        <span>
            {code}
        </span>
    </div>)
}

export default Phase;