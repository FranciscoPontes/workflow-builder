import React from 'react';
import { stateDefinition } from '../State/State';
import './Phase.css';

export interface phaseDefinition {
    code: string,
    order?: number,
    states: Array<stateDefinition>
}

const Phase = ({code, order, states} : phaseDefinition) => {


    return (<div className="phase">
        <span>
            {code}
        </span>
    </div>)
}

export default Phase;