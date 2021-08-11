import React from "react";
import Phase from "../Phase/Phase";

export type workflowData = Array<Object>;

interface workflowProps {
    data: workflowData
}

export const WorkflowBox = ({data} : workflowProps) => {
    return (
        <div id="box" >
            <h3>Workflow</h3>
        </div>
    );
}