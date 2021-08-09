import React from "react";
import Phase from "../Phase/Phase";
import './ObjectList.css';

const defaultNamePhase: string = "PHASE";

export const ObjectList: React.FC = () => {
    return (
        <div id="objectList"> 
            <Phase code={defaultNamePhase}/>
        </div>
    )
}