import React from 'react';
import { stateDefinition } from '../State/State';
import styles from './Phase.module.css';

export interface phaseDefinition {
    id: number,
    code: string,
    sort_order: number,
    onClick?: () => void
}

const Phase = ({code, onClick} : phaseDefinition) => {


    return (<div className={styles.phase} onClick={onClick}>
        <span>
            {code}
        </span>
    </div>)
}

export default Phase;