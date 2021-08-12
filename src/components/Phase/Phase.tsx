import React from 'react';
import { stateDefinition } from '../State/State';
import styles from './Phase.module.css';

export interface phaseDefinition {
    code: string,
    order?: number,
    states: Array<stateDefinition>
}

const Phase = ({code, order, states} : phaseDefinition) => {


    return (<div className={styles.phase}>
        <span>
            {code}
        </span>
    </div>)
}

export default Phase;