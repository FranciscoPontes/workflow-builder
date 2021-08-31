import React, { useState } from 'react'
import styles from './Layout.module.css'
import { WorkflowBox, workflowData } from './WorkflowBox/WorkflowBox'
import Phase, { phaseDefinition } from './Phase/Phase'
import { State, stateDefinition } from './State/State'
import { EModalTypes, IModal, SimpleModal } from './Modal/Modal'
import { ITemplateData, templateData } from '../samples/phases-states-sample'
import { useEffect } from 'react'
import { DBService } from '../services/db_communication'
import NewItemsSpeedDial, {
  TPhaseList,
} from './newItemsSpeedDial/newItemsSpeedDial'
import { useDispatch, useSelector } from 'react-redux'

// const stateTemplate: stateDefinition = {
//     code: "STATE",
//     isUIstate: true
// };

// const phaseTemplate: phaseDefinition = {
//     code: "PHASE",
//     states: [stateTemplate]
// };

// export const

enum EDBTiers {
  DEV = 'DEV',
  Q = 'Q',
  PROD = 'PROD',
}

export interface ILayout {
  appCode: string
  DBTier: EDBTiers
}

interface IAppData {
  phases: Array<Object>
  states: Array<Object>
}

// objet panel in the left + workflow box
const Layout = (props: ILayout) => {
  const refresh = useSelector((state) => state.triggerRefresh)
  const dispatch = useDispatch()

  const getPhases = (data: IAppData): Array<phaseDefinition> => {
    return data.phases.map((pha) => {
      // delete pha.id;
      delete pha.app_id
      delete pha.active_yn
      delete pha.label
      delete pha.description
      delete pha.image
      return pha
    })
  }

  const getStates = (data: IAppData): Array<stateDefinition> => {
    return data.states.map((sta) => {
      delete sta.id
      delete sta.app_id
      delete sta.active_yn
      delete sta.transitional_ny
      delete sta.label
      delete sta.description
      delete sta.image
      delete sta.setting_generator
      return sta
    })
  }

  const arrangedTemplateData = (data: Object): workflowData => ({
    phases: getPhases(data),
    states: getStates(data),
  })

  const [workflowData, setWorkflowData] = useState<workflowData>(null)

  const [modalData, setModalData] = useState<IModal>({
    type: null,
    isOpen: false,
    title: 'Title',
    description: 'something',
    closeHandler: null,
    phasesArray: [],
  })

  const refreshData = async () => {
    const appData = await DBService.getApplicationData({
      appCode: props.appCode,
      DBTier: props.DBTier,
    }).then((res) => res)
    setWorkflowData(arrangedTemplateData(appData))
  }

  useEffect(() => {
    ;(async () => {
      refreshData()
      if (refresh) dispatch({ type: 'STOP_REFRESH' })
    })()

    return () => null
  }, [refresh])

  const getPhaseSelectList = (): TPhaseList =>
    workflowData?.phases.map((pha) => ({ pha_id: pha.id, code: pha.code }))

  useEffect(() => console.log(workflowData), [workflowData])

  return (
    <div className={styles.layout}>
      <WorkflowBox data={workflowData} />
      <NewItemsSpeedDial
        clickHandler={setModalData}
        phases={getPhaseSelectList()}
      />

      <SimpleModal
        isOpen={modalData.isOpen || false}
        title={modalData.title}
        description={modalData.description}
        type={modalData.type}
        closeHandler={() => setModalData({ ...modalData, isOpen: false })}
        phasesArray={modalData.phasesArray}
      />
    </div>
  )
}

export default Layout
