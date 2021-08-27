import React, { useState } from 'react';
import styles from './Layout.module.css';
import { WorkflowBox, workflowData } from './WorkflowBox/WorkflowBox';
import Phase, { phaseDefinition } from './Phase/Phase';
import { State, stateDefinition } from './State/State';
import { SimpleModal } from './Modal/Modal';
import { ITemplateData, templateData } from '../samples/phases-states-sample';

// const stateTemplate: stateDefinition = {
//     code: "STATE",
//     isUIstate: true
// };

// const phaseTemplate: phaseDefinition = {
//     code: "PHASE",
//     states: [stateTemplate]
// };

// export const

// export const addNewState = (phase : phaseDefinition, state: stateDefinition) : phaseDefinition => {
//     return {
//         ...phase,
//         states: [...phase.states, state]
//     };
// }

// export const removeState = (phase : phaseDefinition, state: stateDefinition) : phaseDefinition => {
//     return {
//         ...phase,
//         states: phase.states.filter( el => el.code !== state.code )
//     };
// }

// export const addNewPhase = (phase: phaseDefinition, workflowData: workflowData) : workflowData => {
//     return [...workflowData, phase];
// }

interface ILayout {
    data: {
        data: ITemplateData
    }
}

// objet panel in the left + workflow box
const Layout = ({data}: ILayout) => {

    const validData : ITemplateData = data.data || templateData;

    console.log(validData);

    const getPhases = () : Array<phaseDefinition> =>  {
      return validData.phases.map(pha => {
        // delete pha.id;
        delete pha.app_id;
        delete pha.active_yn;
        delete pha.label;
        delete pha.description;
        delete pha.image;
        return pha;
        })
    } 

    const getStates = () : Array<stateDefinition> =>  {
      return validData.states.map(sta => {
        delete sta.id;
        delete sta.app_id;
        delete sta.active_yn;
        delete sta.transitional_ny;
        delete sta.label;
        delete sta.description;
        delete sta.image;
        delete sta.setting_generator;
        return sta;
        })
    } 

    const arrangedTemplateData : workflowData = {
        phases: getPhases(),
        states: getStates()
    }

    const [ workflowData, setWorkflowData ] = useState<workflowData>(arrangedTemplateData);

    const [ showModal, setShowModal ] = useState<boolean>(false);

    const newPhaseHandler = (code:string) : void => {
        /*const newPhase : phaseDefinition = {
            code: code
        }

        setWorkflowData( addNewPhase(newPhase, workflowData) );
        setShowModal(false);*/
        return;
    }

    return (<div className={styles.layout}>
                <WorkflowBox data={workflowData}/>
                {/* <div id={styles.objectList}>
                    <Phase code={phaseTemplate.code} 
                        onClick={() => setShowModal(true)}/>
                    <State code={stateTemplate.code} 
                        onClick={() => setShowModal(true)}
                        isUIstate={true}
                />
                </div>
                <SimpleModal isOpen={showModal}
                             title='Title'
                             description='something'
                             callback={newPhaseHandler}
                             closeHandler={() => setShowModal(false)}
                /> */}
            </div>);
}

export default Layout;