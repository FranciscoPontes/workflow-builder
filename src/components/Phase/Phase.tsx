import React from 'react'
import styles from './Phase.module.css'
import SettingsIcon from '@material-ui/icons/Settings'
import { EModalTypes, SimpleModal } from '../Modal/Modal'
import { useState } from 'react'

export interface phaseDefinition {
  id: number
  code: string
  label: string
  sortOrder: number
}

const Phase = (props: phaseDefinition) => {
  const [openModal, setOpenModal] = useState<boolean>(false)

  return (
    <div className={styles.phase}>
      <div onClick={() => setOpenModal(true)} style={{ cursor: 'pointer' }}>
        <SettingsIcon fontSize="small" />
      </div>
      <span>{props.code}</span>

      <SimpleModal
        isOpen={openModal}
        type={EModalTypes.phase}
        closeHandler={() => setOpenModal(false)}
        title="Phase settings"
        description="Here the user will be able to configure the phase settings"
        metadata={{ phaseMetadata: props }}
      />
    </div>
  )
}

export default Phase
