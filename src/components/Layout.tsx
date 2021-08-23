import React, { useState } from 'react';
import styles from './Layout.module.css';
import { WorkflowBox, workflowData } from './WorkflowBox/WorkflowBox';
import Phase, { phaseDefinition } from './Phase/Phase';
import { State, stateDefinition } from './State/State';
import { SimpleModal } from './Modal/Modal';

const stateTemplate: stateDefinition = {
    code: "STATE"
};

const phaseTemplate: phaseDefinition = {
    code: "PHASE",
    states: [stateTemplate]
};

// export const

export const addNewState = (phase : phaseDefinition, state: stateDefinition) : phaseDefinition => {
    return {
        ...phase,
        states: [...phase.states, state]
    };
}

export const removeState = (phase : phaseDefinition, state: stateDefinition) : phaseDefinition => {
    return {
        ...phase,
        states: phase.states.filter( el => el.code !== state.code )
    };
}

export const addNewPhase = (phase: phaseDefinition, workflowData: workflowData) : workflowData => {
    return [...workflowData, phase];
}

// objet panel in the left + workflow box
const Layout: React.FC  = () => {

    const [ workflowData, setWorkflowData ] = useState<workflowData>([]);

    const [ showModal, setShowModal ] = useState<boolean>(false);

    const newPhaseHandler = (code:string) => {
        const newPhase : phaseDefinition = {
            code: code,
            states: []
        }

        setWorkflowData( addNewPhase(newPhase, workflowData) );
        setShowModal(false);
    }

    return (<div className={styles.layout}>
                <WorkflowBox data={workflowData}/>
                <div id={styles.objectList}>
                    <Phase code={phaseTemplate.code} 
                        states={phaseTemplate.states} 
                        onClick={() => setShowModal(true)}/>
                    <State code={stateTemplate.code} 
                        onClick={() => setShowModal(true)}
                />
                </div>
                <SimpleModal isOpen={showModal}
                             title='Title'
                             description='something'
                             callback={newPhaseHandler}
                             closeHandler={() => setShowModal(false)}
                />
            </div>);
}

export default Layout;