import React from 'react';
import './Layout.css';
import { ObjectList } from './ObjectList/ObjectList';
import { WorkflowBox } from './WorkflowBox/WorkflowBox';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// objet panel in the left + workflow box
const Layout: React.FC  = () => {

    return (<div>
            <DragDropContext onDragEnd={() => console.log('Drag and drop action just ended!')} >
                <Droppable droppableId="dropppable">   
                {(provided) => 
                <div id="layout"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    >
                    <div ref={provided.innerRef} {...provided.droppableProps} style={{width: '100%'}}> 
                        <WorkflowBox />
                    </div>
                    <Draggable draggableId={"box"} index={1}>
                        {(provided) => 
                            <div style={{width: '100%'}} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                <ObjectList />
                            </div>
                        }
                    </Draggable>
                </div>
                }
                </Droppable>
            </DragDropContext>
    </div>);
}

export default Layout;