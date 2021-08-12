import React from 'react';
import styles from './State.module.css';

export interface stateDefinition {
    code: string,
    order?: number
}

export const State = ({code, order} : stateDefinition) => {
    return (
        <div className={styles.state}>
            {code}
        </div>
    );
}