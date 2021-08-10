import React, { Fragment } from "react";
import Phase from "../Phase/Phase";
import { State } from "../State/State";
import './ObjectList.css';
const defaultNamePhase: string = "PHASE";
const defaultNameState: string = "STATE";

interface objectListProps {
    ref: React.Ref<HTMLInputElement>
}

export const ObjectList = () => {
    return (
        <div id="objectList" > 
            <Phase code={defaultNamePhase}/>
            <State code={defaultNameState}/>
        </div>
    )
}