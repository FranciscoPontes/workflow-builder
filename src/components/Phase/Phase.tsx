import React from 'react'
import { stateDefinition } from '../State/State'
import styles from './Phase.module.css'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import { DBService } from '../../services/db_communication'
import { useDispatch } from 'react-redux'

export interface phaseDefinition {
  id: number
  code: string
  sort_order: number
  onClick?: () => void
}

const Phase = ({ code, onClick, id }: phaseDefinition) => {
  const dispatch = useDispatch()
  const deletePhase = async () => {
    await DBService.changeData({
      change_type: 'REMOVE_PHASE',
      id: id,
    })
    dispatch({ type: 'REFRESH' })
  }

  return (
    <div className={styles.phase} onClick={onClick}>
      <span>{code}</span>
      <div onClick={deletePhase} style={{ cursor: 'pointer' }}>
        <DeleteForeverIcon />
      </div>
    </div>
  )
}

export default Phase
