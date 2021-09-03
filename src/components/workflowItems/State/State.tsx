import React, { Fragment, useEffect } from 'react'
import styles from './State.module.css'
import SettingsIcon from '@material-ui/icons/Settings'
import { useDispatch, useSelector } from 'react-redux'
import { actionTypes } from '../../../store/actionTypes'
import { EModalTypes, IModal } from '../../Modal/Modal'
import { DBActionTypes } from '../../../services/dbActionTypes'
import { DBService } from '../../../services/db_communication'
import { EseverityTypes, ISnackbarData } from '../../SnackBar/SnackBar'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import Badge from '@material-ui/core/Badge'
import Typography from '@material-ui/core/Typography'

export interface stateDefinition {
  id: number
  pha_id: number
  code: string
  label: string
  sort_order: number
}

interface IStateProps {
  props: stateDefinition
  permissionCount: number
}

export const State = ({ props, permissionCount }: IStateProps) => {
  const classes: Array<string> = [styles.state]
  const states = useSelector((state) =>
    state.workflowData.states.filter((sta) => sta.pha_id === props.pha_id),
  )
  const dispatch = useDispatch()

  const statesLenght = states.length

  const indexOfThisState = states.indexOf(
    states.filter((sta) => sta.id === props.id)[0],
  )

  const modalData: IModal = {
    title: 'State settings',
    description: '',
    type: EModalTypes.state,
    metadata: {
      stateMetadata: props,
    },
  }

  const snackbarData: ISnackbarData = {
    content: 'State updated!',
    severity: EseverityTypes.success,
    show: true,
  }

  const triggerDataChange = async (data) => {
    console.log({
      states: data,
      change_type: DBActionTypes.updateStates,
    })
    await DBService.changeData({
      states: data,
      change_type: DBActionTypes.updateStates,
    })

    dispatch({ type: actionTypes.updateSnackbar, data: snackbarData })
    dispatch({ type: actionTypes.refresh })
  }

  const changeStateOrder = async (increment) => {
    const sortOrderOfThisState = states[indexOfThisState].sort_order
    const sortOrderOfSiblingState =
      states[indexOfThisState + increment].sort_order

    let modifiedStates = [...states]

    modifiedStates[indexOfThisState].sort_order = sortOrderOfSiblingState
    modifiedStates[
      indexOfThisState + increment
    ].sort_order = sortOrderOfThisState

    await triggerDataChange(modifiedStates)
  }

  const changeStateOrderUp = async () => {
    if (indexOfThisState + 1 !== statesLenght) changeStateOrder(1)
  }

  const changeStateOrderDown = async () => {
    if (indexOfThisState !== 0) changeStateOrder(-1)
  }

  useEffect(() => console.log(permissionCount), [permissionCount])

  return (
    <div className={styles.stateContainer}>
      <div
        className={styles.gear}
        onClick={() =>
          dispatch({ type: actionTypes.showModal, data: modalData })
        }
      >
        <SettingsIcon fontSize="small" />
      </div>
      <div className={classes.join(' ')}>
        <span>{props.code}</span>
        {/* State dependencies - permissions and actions */}
        <div className={styles.stateDependencies}>
          <Badge color="primary" badgeContent={permissionCount} max={99}>
            <Typography>Permissions</Typography>
          </Badge>
        </div>
      </div>
      <div style={{ display: 'flex' }}>
        <div
          onClick={changeStateOrderDown}
          style={{ cursor: indexOfThisState !== 0 ? 'pointer' : 'default' }}
        >
          <ArrowUpwardIcon
            color={indexOfThisState !== 0 ? 'inherit' : 'disabled'}
          />
        </div>
        <div
          onClick={changeStateOrderUp}
          style={{
            cursor:
              indexOfThisState + 1 !== statesLenght ? 'pointer' : 'default',
          }}
        >
          <ArrowDownwardIcon
            color={
              indexOfThisState + 1 !== statesLenght ? 'inherit' : 'disabled'
            }
          />
        </div>
      </div>
    </div>
  )
}
