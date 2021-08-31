import React, { Fragment, useEffect } from 'react'
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

interface IWorkflow {
  data: workflowData
}

export const addNewState = (
  states: TStates,
  newState: stateDefinition,
): TStates => {
  states.push(newState)
  return states
}
export const removeState = (
  phase: phaseDefinition,
  state: stateDefinition,
): phaseDefinition => {
  return {
    ...phase,
    states: phase.states.filter((el) => el.code !== state.code),
  }
}

export const addNewPhase = (
  phase: phaseDefinition,
  workflowData: workflowData,
): workflowData => {
  return [...workflowData, phase]
}

export const sortPhases = (phases: TPhases): TPhases =>
  phases.sort((x, y) => x.sort_order - y.sort_order)

export const sortStates = (states: TStates): TStates =>
  states.sort((x, y) => x.sort_order - y.sort_order)

export const WorkflowBox = ({ data }: IWorkflow) => {
  return (
    <div id={styles.box}>
      {data
        ? sortPhases(data.phases).map((phase) => (
            <div className={styles.workflowPhases} key={phase.code}>
              <div className={styles.phase}>
                <Phase
                  code={phase.code}
                  sort_order={phase.sort_order}
                  id={phase.id}
                />
              </div>
              <div className={styles.states}>
                {sortStates(
                  data.states.filter((sta) => sta.pha_id === phase.id),
                ).map((sta) => (
                  <State
                    code={sta.code}
                    key={sta.code}
                    sort_order={sta.sort_order}
                    isUIstate={true}
                    pha_id={sta.pha_id}
                    id={sta.id}
                  />
                ))}
              </div>
            </div>
          ))
        : null}
    </div>
  )
}
