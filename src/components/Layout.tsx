import React, { useState } from 'react';
import './Layout.css';
import { WorkflowBox, workflowData } from './WorkflowBox/WorkflowBox';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Phase from './Phase/Phase';
import { State } from './State/State';

const defaultNamePhase: string = "PHASE";
const defaultNameState: string = "STATE";


const testData = [
    {
        
    }
]

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
                                <Phase code={defaultNamePhase}/>
                            </div>
                        }
                    </Draggable>
                    <Draggable draggableId={"state"} index={1}>
                        {(provided) => 
                            <div style={{width: '100%'}} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                <State code={defaultNameState}/>
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