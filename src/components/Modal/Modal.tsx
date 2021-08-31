import React from 'react'
import Modal from '@material-ui/core/Modal'
import styles from './Modal.module.css'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { useState } from 'react'
import PhaseForm from './PhaseForm'
import { useEffect } from 'react'
import StateForm from './StateForm'
import { TPhaseList } from '../newItemsSpeedDial/newItemsSpeedDial'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}))

export enum EModalTypes {
  phase = 'PHASE',
  state = 'STATE',
}

export type IModal = {
  isOpen: boolean
  title: string
  description: string
  type: EModalTypes
  closeHandler: () => void
  phasesArray?: TPhaseList
}

export const SimpleModal = (props: IModal) => {
  const classes = useStyles()

  const body = (
    <div className={styles.paper}>
      <h2>{props.title}</h2>
      <p>{props.description}</p>
      {props.type === EModalTypes.phase ? (
        <PhaseForm />
      ) : props.type === EModalTypes.state ? (
        <StateForm phaseArray={props.phasesArray} />
      ) : null}
    </div>
  )

  return (
    <div>
      <Modal
        open={props.isOpen}
        onClose={() => props.closeHandler()}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  )
}
