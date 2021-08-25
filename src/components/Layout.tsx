import React, { useState } from 'react';
import styles from './Layout.module.css';
import { WorkflowBox, workflowData } from './WorkflowBox/WorkflowBox';
import Phase, { phaseDefinition } from './Phase/Phase';
import { State, stateDefinition } from './State/State';
import { SimpleModal } from './Modal/Modal';

const stateTemplate: stateDefinition = {
    code: "STATE",
    isUIstate: true
};

const phaseTemplate: phaseDefinition = {
    code: "PHASE",
    states: [stateTemplate]
};

// export const

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

export const addNewPhase = (phase: phaseDefinition, workflowData: workflowData) : workflowData => {
    return [...workflowData, phase];
}

const templateData : {
    "phases": Array<Object>,
    "states": Array<Object>
} = {
    "phases": [
      {
        "id": 6181,
        "app_id": 5581,
        "active_yn": "Y",
        "code": "INITIAL",
        "label": "Initial",
        "sort_order": 10,
        "description": null,
        "image": null
      },
      {
        "id": 6182,
        "app_id": 5581,
        "active_yn": "Y",
        "code": "REVIEW",
        "label": "Review",
        "sort_order": 20,
        "description": null,
        "image": null
      },
      {
        "id": 6183,
        "app_id": 5581,
        "active_yn": "Y",
        "code": "EXECUTION",
        "label": "Execution",
        "sort_order": 30,
        "description": null,
        "image": null
      },
      {
        "id": 6184,
        "app_id": 5581,
        "active_yn": "Y",
        "code": "CLOSED",
        "label": "Closed",
        "sort_order": 40,
        "description": null,
        "image": null
      },
      {
        "id": 8603,
        "app_id": 5581,
        "active_yn": "Y",
        "code": "TEST",
        "label": "TEST",
        "sort_order": 50,
        "description": null,
        "image": null
      }
    ],
    "states": [
      {
        "id": 7361,
        "app_id": 5581,
        "active_yn": "Y",
        "transitional_ny": "N",
        "pha_id": 6181,
        "code": "INITIAL_DRAFT",
        "label": "Draft",
        "sort_order": 11,
        "description": null,
        "image": null,
        "setting_generator": null
      },
      {
        "id": 7362,
        "app_id": 5581,
        "active_yn": "Y",
        "transitional_ny": "N",
        "pha_id": 6181,
        "code": "INITIAL_MISSING_INFORMATION",
        "label": "Missing information",
        "sort_order": 12,
        "description": null,
        "image": null,
        "setting_generator": null
      },
      {
        "id": 7363,
        "app_id": 5581,
        "active_yn": "Y",
        "transitional_ny": "N",
        "pha_id": 6181,
        "code": "INITIAL_SUBMIT",
        "label": "Submit",
        "sort_order": 13,
        "description": null,
        "image": null,
        "setting_generator": null
      },
      {
        "id": 7364,
        "app_id": 5581,
        "active_yn": "Y",
        "transitional_ny": "N",
        "pha_id": 6182,
        "code": "REVIEW_PENDING",
        "label": "Pending",
        "sort_order": 21,
        "description": null,
        "image": null,
        "setting_generator": null
      },
      {
        "id": 7365,
        "app_id": 5581,
        "active_yn": "Y",
        "transitional_ny": "N",
        "pha_id": 6182,
        "code": "REVIEW_APPROVED",
        "label": "Approved",
        "sort_order": 22,
        "description": null,
        "image": null,
        "setting_generator": null
      },
      {
        "id": 7366,
        "app_id": 5581,
        "active_yn": "Y",
        "transitional_ny": "N",
        "pha_id": 6182,
        "code": "REVIEW_REJECTED",
        "label": "Rejected",
        "sort_order": 23,
        "description": null,
        "image": null,
        "setting_generator": null
      },
      {
        "id": 7367,
        "app_id": 5581,
        "active_yn": "Y",
        "transitional_ny": "N",
        "pha_id": 6182,
        "code": "REVIEW_MISSING_INFORMATION",
        "label": "Missing information",
        "sort_order": 24,
        "description": null,
        "image": null,
        "setting_generator": null
      },
      {
        "id": 7368,
        "app_id": 5581,
        "active_yn": "Y",
        "transitional_ny": "N",
        "pha_id": 6183,
        "code": "EXECUTION_WAITING",
        "label": "Waiting in progress",
        "sort_order": 30,
        "description": null,
        "image": null,
        "setting_generator": null
      },
      {
        "id": 7369,
        "app_id": 5581,
        "active_yn": "Y",
        "transitional_ny": "N",
        "pha_id": 6183,
        "code": "EXECUTION_IN_PROGRESS",
        "label": "Review in progress",
        "sort_order": 31,
        "description": null,
        "image": null,
        "setting_generator": null
      },
      {
        "pha_id": 6183,
        "code": "EXECUTION_CANCELED",
        "sort_order": 32,
      },
      {
        "pha_id": 6183,
        "code": "EXECUTION_APPROVED",
        "sort_order": 33,
      },
      {
        "pha_id": 6184,
        "code": "CLOSED_CANCELED",
        "sort_order": 41,
      },
      {
        "pha_id": 6184,
        "code": "CLOSED_REJECTED",
        "sort_order": 42,
      },
      {
        "pha_id": 6184,
        "code": "CLOSED_COMPLETED",
        "sort_order": 43,
      }
    ]
  }

// objet panel in the left + workflow box
const Layout: React.FC  = () => {

    const arrangedTemplateData = {
        phases: templateData.phases.map(pha => {
            // delete pha.id;
            delete pha.app_id;
            delete pha.active_yn;
            delete pha.label;
            delete pha.description;
            delete pha.image;
            return pha;
            }),
        states: templateData.states.map(sta => {
            delete sta.id;
            delete sta.app_id;
            delete sta.active_yn;
            delete sta.transactional_ny;
            delete sta.label;
            delete sta.description;
            delete sta.image;
            delete sta.setting_generator;
            return sta;
        })
    }

    const [ workflowData, setWorkflowData ] = useState<workflowData>(arrangedTemplateData);

    const [ showModal, setShowModal ] = useState<boolean>(false);

    const newPhaseHandler = (code:string) => {
        /*const newPhase : phaseDefinition = {
            code: code
        }

        setWorkflowData( addNewPhase(newPhase, workflowData) );
        setShowModal(false);*/
        null;
    }

    return (<div className={styles.layout}>
                <WorkflowBox data={workflowData}/>
                <div id={styles.objectList}>
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
                />
            </div>);
}

export default Layout;