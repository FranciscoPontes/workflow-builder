import React from 'react'
import styles from './Action.module.css'
import MailIcon from '@material-ui/icons/Mail'
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat'
import NewReleasesIcon from '@material-ui/icons/NewReleases'

enum EUserAction {
  yes = 'Y',
  no = 'N',
}

enum EActionTypes {
  mail = 'SEND_MAIL',
  plsql = 'PLSQL',
  stateChange = 'STATUS_CHANGE',
}

export interface IAction {
  action_type: EActionTypes
  code: string
  id: number
  label: number
  sta_id: number
  user_action_yn: EUserAction
  sort_order: number
}

interface IActionProps {
  props: IAction
}

const Action = ({ props }: IActionProps) => {
  return (
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
  )
}

export default Action
