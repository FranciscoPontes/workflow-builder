import React from "react";
import Phase, { phaseDefinition } from "../Phase/Phase";
import styles from './Workflow.module.css';

export type workflowData = Array<phaseDefinition>;

interface workflowProps {
    data: workflowData
}

export const WorkflowBox = ({data} : workflowProps) => {
    return (
        <div id={styles.box} >
            <h3>Workflow</h3>
            <div className={styles.workflowPhases}>
                { data.map( phase => <Phase code={phase.code} key={phase.code} states={phase.states}/>) }
            </div>
        </div>
    );
}