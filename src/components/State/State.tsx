import React, { Fragment, useEffect } from 'react'
import styles from './State.module.css'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import SettingsIcon from '@material-ui/icons/Settings'
import { useDispatch } from 'react-redux'
import { actionTypes } from '../../store/actionTypes'
import { EModalTypes, IModal } from '../Modal/Modal'

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

  const modalData: IModal = {
    isOpen: true,
    title: 'State settings',
    description: '',
    type: EModalTypes.state,
    metadata: {
      stateMetadata: props,
    },
  }

  return (
    <div className={styles.stateContainer}>
      <div
        className={styles.gear}
        onClick={() =>
          dispatch({ type: actionTypes.modalData, data: modalData })
        }
      >
        <SettingsIcon fontSize="small" />
      </div>
      <div className={classes.join(' ')}>{props.code}</div>
      {/* <div className={styles.arrowContainer}>
                <ArrowUpwardIcon fontSize='inherit' className={styles.arrow}/>
                <ArrowDownwardIcon fontSize='inherit'className={styles.arrow}/>
            </div> */}
    </div>
  )
}
