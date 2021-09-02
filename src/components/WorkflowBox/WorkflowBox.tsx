import React, { Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux'
import NewItemsSpeedDial from '../newItemsSpeedDial/newItemsSpeedDial'
import Phase, { phaseDefinition } from '../Phase/Phase'
import { State, stateDefinition } from '../State/State'
import styles from './Workflow.module.css'

type TStates = Array<stateDefinition>
type TPhases = Array<phaseDefinition>

export type workflowData = {
  phases: TPhases
  states: TStates
}

export const WorkflowBox = () => {
  const data: workflowData = useSelector((state) => state.workflowData)

  return (
    <div id={styles.box}>
      {data
        ? data.phases.map((phase) => (
            <div className={styles.workflowPhases} key={phase.code}>
              <div className={styles.phase}>
                <Phase
                  code={phase.code}
                  sort_order={phase.sort_order}
                  id={phase.id}
                  label={phase.label}
                />
              </div>
              <div className={styles.states}>
                {data.states
                  .filter((sta) => sta.pha_id === phase.id)
                  .map((sta) => (
                    <State key={sta.code} props={sta} />
                  ))}
              </div>
            </div>
          ))
        : null}
    </div>
  )
}
