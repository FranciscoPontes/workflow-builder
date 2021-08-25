import React, { Fragment } from "react";
import Phase, { phaseDefinition } from "../Phase/Phase";
import { State, stateDefinition } from "../State/State";
import styles from './Workflow.module.css';

export type workflowData = {
    phases: Array<phaseDefinition>,
    states: Array<stateDefinition>
};

interface workflowProps {
    data: workflowData
}

export const WorkflowBox = ({data} : workflowProps) => {

    // TODO: order phases array by sort order
    
    return (
        <div id={styles.box} >
            <h3>Workflow</h3>
                { data.phases.map( phase => 
                    <div className={styles.workflowPhases} key={phase.code}>
                        <div className={styles.phase}>
                            <Phase code={phase.code} sort_order={phase.sort_order} id={phase.id}/>
                        </div>
                        <div className={styles.states}>
                            { data.states.filter(sta => sta.pha_id === phase.id )
                                         .map( sta => <State code={sta.code} key={sta.code} sort_order={sta.sort_order} isUIstate={true} pha_id={sta.pha_id}/>)}
                        </div>
                    </div>
                ) }
        </div>
    );
}