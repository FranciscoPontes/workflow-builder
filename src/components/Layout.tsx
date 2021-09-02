import React, { Fragment, useState } from 'react'
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
import CustomSnackbar from './SnackBar/SnackBar'
import { actionTypes } from '../store/actionTypes'
import UIConfirmation from './UIConfirmation/UIConfirmation'

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

type TLayout = {
  appCode: string
  DBTier: EDBTiers
  appID: number
}

export interface ILayout {
  props: TLayout
}

interface IAppData {
  phases: Array<Object>
  states: Array<Object>
}

// objet panel in the left + workflow box
const Layout = ({ props }: ILayout) => {
  const refresh = useSelector((state) => state.triggerRefresh)
  const dispatch = useDispatch()

  console.log(props)

  const getPhases = (data: IAppData): Array<phaseDefinition> => {
    return data.phases.map((pha) => {
      // delete pha.id;
      delete pha.app_id
      delete pha.active_yn
      delete pha.description
      delete pha.image
      return pha
    })
  }

  const getStates = (data: IAppData): Array<stateDefinition> => {
    return data.states.map((sta) => {
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
    phases: getPhases(data).sort((x, y) => x.sort_order - y.sort_order),
    states: getStates(data)
      .sort((x, y) => x.sort_order - y.sort_order)
      .sort((x, y) => x.pha_id - y.pha_id),
  })

  const workflowData = useSelector((state) => state.workflowData)

  const modalData = useSelector((state) => state.modalData)

  const refreshData = async () => {
    const appData = await DBService.getApplicationData({
      appCode: props.appCode,
      DBTier: props.DBTier,
    }).then((res) => res)
    dispatch({
      type: actionTypes.updateData,
      data: arrangedTemplateData(appData),
    })
  }

  useEffect(() => {
    ;(async () => {
      refreshData()
      if (refresh) dispatch({ type: actionTypes.stopRefresh })
    })()

    return () => null
  }, [refresh])

  useEffect(() => console.log(workflowData), [workflowData])

  // set app data
  useEffect(() => dispatch({ type: actionTypes.setAppData, data: props }), [])

  return (
    <div className={styles.layout}>
      {workflowData ? (
        <Fragment>
          <WorkflowBox data={workflowData} />
          <NewItemsSpeedDial />

          {modalData ? (
            <SimpleModal
              isOpen={modalData.isOpen || false}
              title={modalData.title}
              description={modalData.description}
              type={modalData.type}
              closeHandler={() =>
                dispatch({
                  type: 'MODAL_DATA',
                  data: { ...modalData, isOpen: false },
                })
              }
              metadata={modalData.metadata}
            />
          ) : null}
          <CustomSnackbar />
          <UIConfirmation />
        </Fragment>
      ) : null}
    </div>
  )
}

export default Layout
