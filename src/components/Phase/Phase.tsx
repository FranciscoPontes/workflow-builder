import React from 'react'
import styles from './Phase.module.css'
import SettingsIcon from '@material-ui/icons/Settings'
import { EModalTypes } from '../Modal/Modal'
import { useState } from 'react'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import { useDispatch, useSelector } from 'react-redux'
import { DBService } from '../../services/db_communication'

export interface phaseDefinition {
  id: number
  code: string
  label: string
  sortOrder: number
}

const Phase = (props: phaseDefinition) => {
  const workflowData = useSelector((state) => state.workflowData)
  const phases = workflowData.phases
  const dispatch = useDispatch()

  const phasesLenght = phases.length

  const indexOfThisPhase = phases.indexOf(
    phases.filter((pha) => pha.id === props.id)[0],
  )

  const triggerDataChange = async (data) => {
    await DBService.changeData({
      phases: data,
      change_type: 'UPDATE_PHASES',
    })

    dispatch({ type: 'REFRESH' })
  }

  const changePhaseOrder = async (increment) => {
    const sortOrderOfThisPhase = phases[indexOfThisPhase].sort_order
    const sortOrderOfSiblingPhase =
      phases[indexOfThisPhase + increment].sort_order

    let modifiedPhases = [...phases]

    modifiedPhases[indexOfThisPhase].sort_order = sortOrderOfSiblingPhase
    modifiedPhases[
      indexOfThisPhase + increment
    ].sort_order = sortOrderOfThisPhase

    await triggerDataChange(modifiedPhases)
  }

  const changePhaseOrderUp = async () => {
    changePhaseOrder(1)
  }

  const changePhaseOrderDown = async () => {
    changePhaseOrder(-1)
  }

  const phaseModalData = {
    title: 'Phase settings',
    description: 'Here the user will be able to configure the phase settings',
    isOpen: true,
    type: EModalTypes.phase,
    metadata: { phaseMetadata: props },
  }

  return (
    <div className={styles.phase}>
      <div
        onClick={() =>
          dispatch({
            type: 'MODAL_DATA',
            data: phaseModalData,
          })
        }
        style={{ cursor: 'pointer' }}
      >
        <SettingsIcon fontSize="small" />
      </div>
      <span>{props.code}</span>
      <div style={{ display: 'flex' }}>
        {indexOfThisPhase !== 0 ? (
          <div onClick={changePhaseOrderDown} style={{ cursor: 'pointer' }}>
            <ArrowUpwardIcon />
          </div>
        ) : null}
        {indexOfThisPhase + 1 !== phasesLenght ? (
          <div onClick={changePhaseOrderUp} style={{ cursor: 'pointer' }}>
            <ArrowDownwardIcon />
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default Phase
