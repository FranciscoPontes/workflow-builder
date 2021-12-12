import React, { Fragment } from 'react'
import styles from './Action.module.css'
import MailIcon from '@material-ui/icons/Mail'
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat'
import NewReleasesIcon from '@material-ui/icons/NewReleases'
import SettingsIcon from '@material-ui/icons/Settings'
import { useDispatch, useSelector } from 'react-redux'
import { actionTypes } from '../../../store/actionTypes'
import { EModalTypes, IModal } from '../../Modal/Modal'
import { useEffect } from 'react'
import { EseverityTypes, ISnackbarData } from '../../SnackBar/SnackBar'
import { DBActionTypes } from '../../../services/dbActionTypes'
import { DBService } from '../../../services/db_communication'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import { ESwitch } from '../../../types/types'

export interface IActionSetting {
  id: number
  act_id: number
  name: string
  string_value: string
}

export enum EActionTypes {
  mail = 'SEND_MAIL',
  plsql = 'PLSQL',
  stateChange = 'STATUS_CHANGE',
}

export interface IAction {
  action_type: EActionTypes
  code: string
  id: number
  label: string
  sta_id: number
  user_action_yn: ESwitch
  sort_order: number
  action_settings?: Array<IActionSetting>
  reqt_id: number
  active_yn: ESwitch
}

interface IActionProps {
  props: IAction
}

const Action = ({ props }: IActionProps) => {
  const dispatch = useDispatch()
  const appID = useSelector((state) => state.appData.appID)
  const workflowData = useSelector((state) => state.workflowData)

  const modalData: IModal = {
    title: 'Action settings',
    description: '',
    type: EModalTypes.action,
    metadata: {
      actionMetadata: props,
    },
  }

  const actions = useSelector((state) =>
    state.workflowData.actions
      .filter((act) => act.sta_id === props.sta_id)
      .map((act) => ({ ...act, app_id: appID })),
  )

  const actionTypeActionSettingMapping = {
    [EActionTypes.mail]: 'MAIL_TEMPLATE_CODE',
    [EActionTypes.plsql]: 'PLSQL_FUNCTION_NAME',
    [EActionTypes.stateChange]: 'NEXT_STATE_CODE_1',
  }

  const actionsLenght = actions.length

  const indexOfThisAction = actions.indexOf(
    actions.filter((act) => act.id === props.id)[0],
  )

  const snackbarData: ISnackbarData = {
    content: 'Action updated!',
    severity: EseverityTypes.success,
    show: true,
  }

  const triggerDataChange = async (data) => {
    console.log(
      JSON.stringify({
        actions: data,
        change_type: DBActionTypes.updateActions,
      }),
    )
    await DBService.changeData({
      actions: data,
      change_type: DBActionTypes.updateActions,
    })
      .then(() => {
        dispatch({ type: actionTypes.updateSnackbar, data: snackbarData })
        dispatch({ type: actionTypes.refresh })
      })
      .catch((err) => {
        console.error(err.message)
        dispatch({
          type: actionTypes.updateSnackbar,
          data: {
            ...snackbarData,
            severity: EseverityTypes.error,
            content: `Error updating action order! ${err.message}`,
          },
        })
      })
  }

  const changeActionOrder = async (increment) => {
    const sortOrderOfThisState = actions[indexOfThisAction].sort_order
    const sortOrderOfSiblingState =
      actions[indexOfThisAction + increment].sort_order

    let modifiedActions = [...actions]

    modifiedActions[indexOfThisAction].sort_order = sortOrderOfSiblingState
    modifiedActions[
      indexOfThisAction + increment
    ].sort_order = sortOrderOfThisState

    await triggerDataChange(modifiedActions)
  }

  const changeActionOrderUp = async () => {
    if (indexOfThisAction + 1 !== actionsLenght) changeActionOrder(1)
  }

  const changeActionOrderDown = async () => {
    if (indexOfThisAction !== 0) changeActionOrder(-1)
  }

  const requestTypes = workflowData.request_types?.map((reqt) => reqt)

  const getCorrectActionSetting: Array<IActionSetting> = props.action_settings?.filter(
    (acts) => acts.name === actionTypeActionSettingMapping[props?.action_type],
  )

  const actionSettingInfo = (
    <div
      style={{
        display: 'flex',
        flexFlow: 'column',
      }}
    >
      <span>
        {props.action_type === EActionTypes.mail
          ? `Mail code: ${getCorrectActionSetting[0].string_value || ''}`
          : props.action_type === EActionTypes.plsql
          ? `PL/SQL Function: ${getCorrectActionSetting[0].string_value || ''}`
          : props.action_type === EActionTypes.stateChange
          ? `From ${props.code} to ${
              getCorrectActionSetting[0].string_value || ''
            }`
          : ''}
      </span>
      <span>
        {`Request type: ${
          props.reqt_id
            ? requestTypes.filter((reqt) => reqt.id === props.reqt_id)[0].code
            : 'All'
        }`}
      </span>
    </div>
  )

  return (
    <div style={{ display: 'flex', width: '80%' }}>
      <div
        style={{ cursor: 'pointer', height: 'fit-content' }}
        onClick={() =>
          dispatch({ type: actionTypes.showModal, data: modalData })
        }
      >
        <SettingsIcon fontSize="small" />
      </div>
      <div
        className={[
          styles.action,
          props.user_action_yn === 'Y'
            ? styles.UIAction
            : styles.automaticAction,
        ].join(' ')}
      >
        <div
          style={{
            display: 'flex',
            flexFlow: 'column',
          }}
        >
          <h4>
            {`${props.label} - ${
              props.user_action_yn !== 'Y' ? 'Automatic action' : 'User Action'
            }`}
          </h4>
          <span>{actionSettingInfo}</span>
        </div>
        {props.action_type === EActionTypes.mail ? (
          <MailIcon />
        ) : props.action_type === EActionTypes.stateChange ? (
          <TrendingFlatIcon />
        ) : (
          <NewReleasesIcon />
        )}
      </div>
      <div style={{ display: 'flex' }}>
        <div
          onClick={changeActionOrderDown}
          style={{
            cursor: indexOfThisAction !== 0 ? 'pointer' : 'default',
            height: 'fit-content',
          }}
        >
          <ArrowUpwardIcon
            color={indexOfThisAction !== 0 ? 'inherit' : 'disabled'}
          />
        </div>
        <div
          onClick={changeActionOrderUp}
          style={{
            cursor:
              indexOfThisAction + 1 !== actionsLenght ? 'pointer' : 'default',
            height: 'fit-content',
          }}
        >
          <ArrowDownwardIcon
            color={
              indexOfThisAction + 1 !== actionsLenght ? 'inherit' : 'disabled'
            }
          />
        </div>
      </div>
    </div>
  )
}

export default Action