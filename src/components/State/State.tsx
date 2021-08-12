import React from 'react';
import styles from './State.module.css';

export interface stateDefinition {
    code: string,
    order?: number,
    onClick?: () => void
}

export const State = ({code, order, onClick} : stateDefinition) => {
    return (
        <div className={styles.state} onClick={onClick}>
            {code}
        </div>
    );
}