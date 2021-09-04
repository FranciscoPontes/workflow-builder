import React, { Fragment } from 'react'
import styles from './Action.module.css'
import MailIcon from '@material-ui/icons/Mail'
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat'
import NewReleasesIcon from '@material-ui/icons/NewReleases'
import SettingsIcon from '@material-ui/icons/Settings'
import { useDispatch } from 'react-redux'
import { actionTypes } from '../../../store/actionTypes'
import { EModalTypes, IModal } from '../../Modal/Modal'
import { useEffect } from 'react'

export interface IActionSetting {
  id: number
  act_id: number
  name: string
  string_value: string
}

enum EUserAction {
  yes = 'Y',
  no = 'N',
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
  user_action_yn: EUserAction
  sort_order: number
  action_settings?: Array<IActionSetting>
}

interface IActionProps {
  props: IAction
}

const Action = ({ props }: IActionProps) => {
  const dispatch = useDispatch()

  const modalData: IModal = {
    title: 'Action settings',
    description: '',
    type: EModalTypes.action,
    metadata: {
      actionMetadata: props,
    },
  }

  return (
    <div style={{ display: 'flex', width: '60%' }}>
      <div
        style={{ cursor: 'pointer', height: 'fit-content' }}
        onClick={() =>
          dispatch({ type: actionTypes.showModal, data: modalData })
        }
      >
        <SettingsIcon fontSize="small" />
      </div>
      <div className={styles.action}>
        <span>{props.label}</span>
        {props.action_type === EActionTypes.mail ? (
          <MailIcon />
        ) : props.action_type === EActionTypes.stateChange ? (
          <TrendingFlatIcon />
        ) : (
          <NewReleasesIcon />
        )}
      </div>
    </div>
  )
}

export default Action
