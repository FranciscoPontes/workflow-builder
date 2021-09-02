import React, { Fragment, useState } from 'react'
import styles from './Layout.module.css'
import { WorkflowBox, workflowData } from './WorkflowBox/WorkflowBox'
import Phase, { phaseDefinition } from './Phase/Phase'
import { State, stateDefinition } from './State/State'
import { EModalTypes, IModal, SimpleModal } from './Modal/Modal'
import { useEffect } from 'react'
import { DBService } from '../services/db_communication'
import NewItemsSpeedDial, {
  TPhaseList,
} from './newItemsSpeedDial/newItemsSpeedDial'
import { useDispatch, useSelector } from 'react-redux'
import CustomSnackbar from './SnackBar/SnackBar'
import { actionTypes } from '../store/actionTypes'
import UIConfirmation from './UIConfirmation/UIConfirmation'

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

// objet panel in the left + workflow box
const Layout = ({ props }: ILayout) => {
  const refresh = useSelector((state) => state.triggerRefresh)
  const dispatch = useDispatch()
  const workflowData = useSelector((state) => state.workflowData)
  const modalData = useSelector((state) => state.modalData)

  const getPhases = (data: workflowData): Array<phaseDefinition> => {
    return data.phases?.map((pha) => {
      const treatedPhase: phaseDefinition = {
        id: pha.id,
        code: pha.code,
        label: pha.label,
        sort_order: pha.sort_order,
      }
      return treatedPhase
    })
  }

  const getStates = (data: workflowData): Array<stateDefinition> => {
    return data.states?.map((sta) => {
      const treatedState: stateDefinition = {
        id: sta.id,
        pha_id: sta.pha_id,
        code: sta.code,
        label: sta.label,
        sort_order: sta.sort_order,
      }
      return treatedState
    })
  }

  const arrangedTemplateData = (data: workflowData): workflowData => ({
    phases: getPhases(data)?.sort((x, y) => x.sort_order - y.sort_order),
    states: getStates(data)
      ?.sort((x, y) => x.sort_order - y.sort_order)
      .sort((x, y) => x.pha_id - y.pha_id),
  })

  const refreshData = async () => {
    const appData = await DBService.getApplicationData({
      appCode: props.appCode,
      DBTier: props.DBTier,
    }).then((res) => res)
    console.log(appData)
    dispatch({
      type: actionTypes.updateData,
      data: arrangedTemplateData(appData),
    })
  }

  // set app data
  useEffect(() => dispatch({ type: actionTypes.setAppData, data: props }), [])

  useEffect(() => {
    ;(async () => {
      refreshData()
      if (refresh) dispatch({ type: actionTypes.stopRefresh })
    })()

    return () => null
  }, [refresh])

  return (
    <div className={styles.layout}>
      {workflowData ? (
        <Fragment>
          <WorkflowBox />
          <NewItemsSpeedDial />

          {modalData ? (
            <SimpleModal
              isOpen={modalData.isOpen || false}
              title={modalData.title}
              description={modalData.description}
              type={modalData.type}
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
