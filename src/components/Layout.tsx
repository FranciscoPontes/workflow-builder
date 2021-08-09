import React from 'react';
import './Layout.css';
import { ObjectList } from './ObjectList/ObjectList';
import Phase from './Phase/Phase';

const WorkflowBox: React.FC = () => {
    return (
        <div id="box">
            <h3>Workflow</h3>
        </div>
    );
}

// objet panel in the left + workflow box
const Layout: React.FC  = () => {
 
    

    return (<div id="layout">
        <ObjectList />
        <WorkflowBox />
    </div>);
}

export default Layout;