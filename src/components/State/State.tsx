import React, { Fragment } from 'react';
import styles from './State.module.css';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import SettingsIcon from '@material-ui/icons/Settings';
import { SimpleModal } from '../Modal/Modal';
import { useState } from 'react';

export interface stateDefinition {
    code: string,
    sort_order: number,
    onClick?: () => void,
    isUIstate?: boolean,
    pha_id: number 
}

export const State = ({code, sort_order, onClick, isUIstate} : stateDefinition) => {
    const classes : Array<string> = [styles.state]
    if (!isUIstate) classes.push(styles.notUIState)

    const [ showModal, setShowModal ] = useState<boolean>(false);
    
    return (
        <div className={styles.stateContainer}>
            <div className={styles.gear} onClick={() => setShowModal(true)}>
                <SettingsIcon fontSize='small'/>
            </div>
            <div className={classes.join(' ')} onClick={onClick}>
                {code}
            </div>
            {/* <div className={styles.arrowContainer}>
                <ArrowUpwardIcon fontSize='inherit' className={styles.arrow}/>
                <ArrowDownwardIcon fontSize='inherit'className={styles.arrow}/>
            </div> */}
            <SimpleModal isOpen={showModal}
                         title='State settings'
                         description='Here the user will be able to configure the actions and the permissions for the state'
                         callback={() => null}
                         closeHandler={() => setShowModal(false)}/>
        </div>
    );
}