import React from 'react';
import './Phase.css';

interface PhaseProps {
    code?: string,
    // order: number,
    ref?: (element: HTMLElement | null) => any
}

const Phase = ({code, ref} : PhaseProps) => {


    return (<div className="phase">
        <span>
            {code}
        </span>
    </div>)
}

export default Phase;