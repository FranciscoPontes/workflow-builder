import React from 'react';
import { stateDefinition } from '../State/State';
import styles from './Phase.module.css';

export interface phaseDefinition {
    code: string,
    order?: number,
    states: Array<stateDefinition>,
    onClick?: () => void
}

const Phase = ({code, order, states, onClick} : phaseDefinition) => {


    return (<div className={styles.phase} onClick={onClick}>
        <span>
            {code}
        </span>
    </div>)
}

export default Phase;