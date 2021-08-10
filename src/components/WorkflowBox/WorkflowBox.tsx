import React from "react";
import Phase from "../Phase/Phase";

interface workflowBoxProps {
    ref: React.Ref<HTMLInputElement>
}

export const WorkflowBox = () => {
    return (
        <div id="box" >
            <h3>Workflow</h3>
            <Phase />
        </div>
    );
}