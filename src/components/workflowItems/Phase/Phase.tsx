import React from 'react'
import styles from './Phase.module.css'
import SettingsIcon from '@material-ui/icons/Settings'
import { EModalMetadataTypes, EModalTypes, IModal } from '../../Modal/Modal'
import { useState } from 'react'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import { useDispatch, useSelector } from 'react-redux'
import { DBService } from '../../../services/db_communication'
import { actionTypes } from '../../../store/actionTypes'
import { EseverityTypes, ISnackbarData } from '../../SnackBar/SnackBar'
import { DBActionTypes } from '../../../services/dbActionTypes'
import AddCircleIcon from '@material-ui/icons/AddCircle'

export interface phaseDefinition {
  id: number
  code: string
  label: string
  sort_order: number
}

const Phase = (props: phaseDefinition) => {
  const workflowData = useSelector((state) => state.workflowData)
  const phases = workflowData.phases
  const dispatch = useDispatch()

  const phasesLenght = phases.length

  const indexOfThisPhase = phases.indexOf(
    phases.filter((pha) => pha.id === props.id)[0],
  )

  const snackbarData: ISnackbarData = {
    content: 'Phase updated!',
    severity: EseverityTypes.success,
    show: true,
  }

  const triggerDataChange = async (data) => {
    await DBService.changeData({
      phases: data,
      change_type: DBActionTypes.updatePhases,
    })

    dispatch({ type: actionTypes.updateSnackbar, data: snackbarData })
    dispatch({ type: actionTypes.refresh })
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
    if (indexOfThisPhase + 1 !== phasesLenght) changePhaseOrder(1)
  }

  const changePhaseOrderDown = async () => {
    if (indexOfThisPhase !== 0) changePhaseOrder(-1)
  }

  const phaseModalData = {
    title: 'Phase settings',
    description: null,
    type: EModalTypes.phase,
    metadata: { phaseMetadata: props },
  }

  const metadata: EModalMetadataTypes = {
    stateMetadata: {
      pha_id: props.id,
    },
  }

  return (
    <div className={styles.phase}>
      <div
        onClick={() =>
          dispatch({
            type: actionTypes.showModal,
            data: phaseModalData,
          })
        }
        style={{ cursor: 'pointer' }}
      >
        <SettingsIcon fontSize="small" />
      </div>
      <span>{props.code}</span>
      <div style={{ display: 'flex' }}>
        <div
          onClick={changePhaseOrderDown}
          style={{ cursor: indexOfThisPhase !== 0 ? 'pointer' : 'default' }}
        >
          <ArrowUpwardIcon
            color={indexOfThisPhase !== 0 ? 'inherit' : 'disabled'}
          />
        </div>
        <div
          onClick={changePhaseOrderUp}
          style={{
            cursor:
              indexOfThisPhase + 1 !== phasesLenght ? 'pointer' : 'default',
          }}
        >
          <ArrowDownwardIcon
            color={
              indexOfThisPhase + 1 !== phasesLenght ? 'inherit' : 'disabled'
            }
          />
        </div>
      </div>
    </div>
  )
}

export default Phase
