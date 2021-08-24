import React from 'react';
import styles from './State.module.css';

export interface stateDefinition {
    code: string,
    order?: number,
    onClick?: () => void,
    isUIstate: boolean 
}

export const State = ({code, order, onClick, isUIstate} : stateDefinition) => {
    const classes : Array<string> = [styles.state]
    if (!isUIstate) classes.push(styles.notUIState)
    
    return (
        <div className={classes.join(' ')} onClick={onClick}>
            {code}
        </div>
    );
}