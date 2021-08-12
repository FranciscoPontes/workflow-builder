import React from 'react';
import './State.css';

export interface stateDefinition {
    code: string,
    order?: number
}

export const State = ({code, order} : stateDefinition) => {
    return (
        <div className="state">
            {code}
        </div>
    );
}