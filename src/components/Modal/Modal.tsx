import React from 'react'
import Modal from '@material-ui/core/Modal'
import styles from './Modal.module.css'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { useState } from 'react'
import PhaseForm from './PhaseForm/PhaseForm'
import { useEffect } from 'react'
import StateForm from './StateForm'
import { TPhaseList } from '../newItemsSpeedDial/newItemsSpeedDial'
import { phaseDefinition } from '../Phase/Phase'
import { stateDefinition } from '../State/State'
import { useDispatch, useSelector } from 'react-redux'

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

export interface EModalMetadataTypes {
  phaseMetadata?: phaseDefinition
  stateMetadata?: stateDefinition
}

export type IModal = {
  isOpen: boolean
  title: string
  description: string
  type: EModalTypes
  metadata?: EModalMetadataTypes
}

export const SimpleModal = (props: IModal) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const modalData = useSelector((state) => state.modalData)

  const body = (
    <div className={styles.paper}>
      <h2>{props.title}</h2>
      <p>{props.description}</p>
      {props.type === EModalTypes.phase ? (
        <PhaseForm props={props?.metadata?.phaseMetadata} />
      ) : props.type === EModalTypes.state ? (
        <StateForm />
      ) : null}
    </div>
  )

  return (
    <div>
      <Modal
        open={props.isOpen}
        onClose={() =>
          dispatch({
            type: 'MODAL_DATA',
            data: { ...modalData, isOpen: false },
          })
        }
      >
        {body}
      </Modal>
    </div>
  )
}
