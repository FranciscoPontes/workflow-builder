import React from "react";
import Phase from "../Phase/Phase";
import styles from './Workflow.module.css';

export type workflowData = Array<Object>;

interface workflowProps {
    data: workflowData
}

export const WorkflowBox = ({data} : workflowProps) => {
    return (
        <div id={styles.box} >
            <h3>Workflow</h3>
        </div>
    );
}