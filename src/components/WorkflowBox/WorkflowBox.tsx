import React, { Fragment, useEffect } from "react";
import Phase, { phaseDefinition } from "../Phase/Phase";
import { State, stateDefinition } from "../State/State";
import styles from './Workflow.module.css';

export type workflowData = {
    phases: Array<phaseDefinition>,
    states: Array<stateDefinition>
};

interface IWorkflow {
    data: workflowData
}

export const WorkflowBox = ({data} : IWorkflow) => {

    // TODO: order phases array by sort order
    useEffect( () => console.log(data), [data]);

    return (
        <div id={styles.box} >
            { data?.phases.map( phase => 
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