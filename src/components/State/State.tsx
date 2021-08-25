import React from 'react';
import styles from './State.module.css';

export interface stateDefinition {
    code: string,
    sort_order: number,
    onClick?: () => void,
    isUIstate: boolean,
    pha_id: number 
}

export const State = ({code, sort_order, onClick, isUIstate} : stateDefinition) => {
    const classes : Array<string> = [styles.state]
    if (!isUIstate) classes.push(styles.notUIState)
    
    return (
        <div className={classes.join(' ')} onClick={onClick}>
            {code}
        </div>
    );
}