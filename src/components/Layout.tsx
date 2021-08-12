import React, { useState } from 'react';
import './Layout.css';
import { WorkflowBox, workflowData } from './WorkflowBox/WorkflowBox';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Phase, { phaseDefinition } from './Phase/Phase';
import { State, stateDefinition } from './State/State';

const stateTemplate: stateDefinition = {
    code: "STATE"
};

const phaseTemplate: phaseDefinition = {
    code: "PHASE",
    states: [stateTemplate]
};

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

// objet panel in the left + workflow box
const Layout: React.FC  = () => {

    const [ workflowData, setWorkflowData ] = useState<workflowData>([{}]);

    return (<div>
            <DragDropContext onDragEnd={() => console.log('Drag and drop action just ended!')} >
                <Droppable droppableId="dropppable">   
                {(provided) => 
                <div id="layout"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    >
                    <div ref={provided.innerRef} {...provided.droppableProps} style={{width: '100%'}}> 
                        <WorkflowBox data={workflowData}/>
                    </div>
                    <div id="object-list">
                    <Draggable draggableId={"phase"} index={1}>
                        {(provided) => 
                            <div style={{width: '100%'}} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                <Phase code={phaseTemplate.code} states={phaseTemplate.states}/>
                            </div>
                        }
                    </Draggable>
                    <Draggable draggableId={"state"} index={1}>
                        {(provided) => 
                            <div style={{width: '100%'}} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                <State code={stateTemplate.code}/>
                            </div>
                        }
                    </Draggable>
                    </div>
                </div>
                }
                </Droppable>
            </DragDropContext>
    </div>);
}

export default Layout;