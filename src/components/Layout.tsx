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
import { IPermission } from './workflowItems/Permission/Permission'
import { IAction } from './workflowItems/Action/Action'
import AddCircleIcon from '@material-ui/icons/AddCircle'

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

  const PhaseModalData: IModal = {
    type: EModalTypes.phase,
    title: 'New Phase',
    description: '',
  }

  const preparePhases = (data: workflowData): Array<phaseDefinition> => {
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

  const prepareStates = (data: workflowData): Array<stateDefinition> => {
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

  const preparePermissions = (data: workflowData): Array<IPermission> => {
    return data.permissions?.map((per) => {
      const treatedPer: IPermission = {
        id: per.id,
        sta_id: per.sta_id,
        reqt_id: per.reqt_id,
        permission_type: per.permission_type,
        user_type: per.user_type,
        username: per.username,
      }
      return treatedPer
    })
  }

  const prepareActions = (data: workflowData): Array<IAction> => {
    return data.actions?.map((act) => {
      const treatedAct: IAction = {
        id: act.id,
        code: act.code,
        label: act.label,
        sta_id: act.sta_id,
        user_action_yn: act.user_action_yn,
        action_type: act.action_type,
        sort_order: act.sort_order,
      }
      return treatedAct
    })
  }

  const arrangedTemplateData = (data: workflowData): workflowData => ({
    phases: preparePhases(data)?.sort((x, y) => x.sort_order - y.sort_order),
    states: prepareStates(data)
      ?.sort((x, y) => x.sort_order - y.sort_order)
      .sort((x, y) => x.pha_id - y.pha_id),
    permissions: preparePermissions(data),
    actions: prepareActions(data),
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
          <div
            style={{
              margin: '0 10px',
              cursor: 'pointer',
              height: 'fit-content',
            }}
            onClick={() =>
              dispatch({
                type: actionTypes.showModal,
                data: PhaseModalData,
              })
            }
          >
            <AddCircleIcon fontSize="large" />
          </div>
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
