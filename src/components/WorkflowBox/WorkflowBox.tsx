import React, { Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { TStore } from '../../types/types'
import NewItemsSpeedDial from '../newItemsSpeedDial/newItemsSpeedDial'
import { IAction } from '../workflowItems/Action/Action'
import { IPermission } from '../workflowItems/Permission/Permission'
import Phase, { phaseDefinition } from '../workflowItems/Phase/Phase'
import { State, stateDefinition } from '../workflowItems/State/State'
import styles from './Workflow.module.css'

type TStates = Array<stateDefinition>
type TPhases = Array<phaseDefinition>
type TPermissions = Array<IPermission>
type TActions = Array<IAction>
export type TMailTemplates = Array<{
  code: string
}>

export type TRequestTypes = Array<{
  id: number
  code: string
}>

export type workflowData = {
  phases: TPhases
  states: TStates
  permissions: TPermissions
  actions: TActions
  mail_templates: TMailTemplates
  request_types: TRequestTypes
}

export const WorkflowBox = () => {
  const data: workflowData = useSelector((state: TStore) => state.workflowData)
  const selectedPhase = useSelector((state: TStore) => state.selectedPhase)
  const collapsedPhases = useSelector((state: TStore) => state.collapsedPhases)

  const statePermissionCount = (sta: stateDefinition): number => {
    return data.permissions?.filter((per) => per.sta_id === sta.id).length
  }

  const stateActions = (sta: stateDefinition): TActions => {
    return data.actions?.filter((act) => act.sta_id === sta.id)
  }

  return (
    <div id={styles.box}>
      {data
        ? data.phases?.map((phase) => (
            <div
              className={[
                styles.workflowPhases,
                selectedPhase === phase.id ? styles.selected : '',
              ].join(' ')}
              key={phase.code}
            >
              <div className={styles.phase}>
                <Phase
                  code={phase.code}
                  sort_order={phase.sort_order}
                  id={phase.id}
                  label={phase.label}
                />
              </div>
              {!collapsedPhases.includes(phase.id) ? (
                <div className={styles.states}>
                  {data.states
                    ?.filter((sta) => sta.pha_id === phase.id)
                    .map((sta) => (
                      <State
                        key={sta.code}
                        props={sta}
                        permissionCount={statePermissionCount(sta)}
                        actions={stateActions(sta)}
                      />
                    ))}
                </div>
              ) : null}
            </div>
          ))
        : null}
    </div>
  )
}
