import React, { Fragment } from "react";
import Phase, { phaseDefinition } from "../Phase/Phase";
import { State } from "../State/State";
import styles from './Workflow.module.css';

export type workflowData = Array<phaseDefinition>;

interface workflowProps {
    data: workflowData
}

export const WorkflowBox = ({data} : workflowProps) => {
    return (
        <div id={styles.box} >
            <h3>Workflow</h3>
                { data.map( phase => 
                    <div className={styles.workflowPhases}>
                        <div className={styles.phase}>
                            <Phase code={phase.code} key={phase.code} states={phase.states}/>
                        </div>
                        <div className={styles.states}>
                            <State code="INITIAL" isUIstate={true}/>
                            <State code="REVIEW_PENDING" isUIstate={true}/>
                            <State code="REVIEW_SEND_MAIL" isUIstate={false}/>
                        </div>
                    </div>
                ) }
        </div>
    );
}