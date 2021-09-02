import React, { Fragment, useEffect } from 'react'
import styles from './State.module.css'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import SettingsIcon from '@material-ui/icons/Settings'
import { useState } from 'react'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import { useDispatch } from 'react-redux'
import { DBService } from '../../services/db_communication'
import { actionTypes } from '../../store/actionTypes'

export interface stateDefinition {
  id: number
  pha_id: number
  code: string
  label: string
  sort_order: number
}

interface IStateProps {
  props: stateDefinition
}

export const State = ({ props }: IStateProps) => {
  const classes: Array<string> = [styles.state]
  const dispatch = useDispatch()

  const [showModal, setShowModal] = useState<boolean>(false)

  const deleteState = async () => {
    await DBService.changeData({
      change_type: 'REMOVE_STATE',
      id: props.id,
    })
    dispatch({ type: actionTypes.refresh })
  }
  return (
    <div className={styles.stateContainer}>
      <div className={styles.gear} onClick={() => setShowModal(true)}>
        <SettingsIcon fontSize="small" />
      </div>
      <div className={classes.join(' ')}>{props.code}</div>
      <div onClick={deleteState} style={{ cursor: 'pointer' }}>
        <DeleteForeverIcon />
      </div>
      {/* <div className={styles.arrowContainer}>
                <ArrowUpwardIcon fontSize='inherit' className={styles.arrow}/>
                <ArrowDownwardIcon fontSize='inherit'className={styles.arrow}/>
            </div> */}
    </div>
  )
}
