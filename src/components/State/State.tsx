import React from 'react';
import './State.css';

interface stateProps {
    code?: string
}

export const State = ({code} : stateProps) => {
    return (
        <div className="state">
            {code}
        </div>
    );
}