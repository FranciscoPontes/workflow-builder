import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { useState } from 'react'
import Button from '@material-ui/core/Button'
import { Formik } from 'formik'
import { DBService } from '../../../services/db_communication'
import { useDispatch, useSelector } from 'react-redux'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import { actionTypes } from '../../../store/actionTypes'
import DeleteIcon from '@material-ui/icons/Delete'
import { IConfirmationData } from '../../UIConfirmation/UIConfirmation'
import { useEffect } from 'react'
import { DBActionTypes } from '../../../services/dbActionTypes'
import styles from './ActionForm.module.css'
import {
  EActionTypes,
  IAction,
  IActionSetting,
} from '../../workflowItems/Action/Action'
import { stateDefinition } from '../../workflowItems/State/State'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))

interface IActionForm {
  props: IAction
}

const ActionForm = ({ props }: IActionForm) => {
  const dispatch = useDispatch()
  const workflowData = useSelector((state) => state.workflowData)
  const appID = useSelector((state) => state.appData.appID)
  const classes = useStyles()

  const validActionTypes: Array<EActionTypes> = [
    EActionTypes.mail,
    EActionTypes.plsql,
    EActionTypes.stateChange,
  ]

  const actionTypeActionSettingMapping = {
    [EActionTypes.mail]: 'MAIL_TEMPLATE_CODE',
    [EActionTypes.plsql]: 'PLSQL_FUNCTION_NAME',
    [EActionTypes.stateChange]: 'NEXT_STATE_CODE_1',
  }

  const actionTypeActionSettingLabelMapping = {
    [EActionTypes.mail]: 'Mail template code',
    [EActionTypes.plsql]: 'PLSQL Function Name',
    [EActionTypes.stateChange]: 'Next state code',
  }

  const getCorrectActionSetting = (): Array<IActionSetting> =>
    props.action_settings?.filter(
      (acts) => acts.name === actionTypeActionSettingMapping[props.action_type],
    )

  const [data, setData] = useState<IAction>({
    action_type: props.action_type || null,
    code: props.code,
    id: props.id,
    label: props.label,
    sta_id: props.sta_id,
    user_action_yn: props.user_action_yn,
    sort_order: props.sort_order,
    action_settings: props.id ? getCorrectActionSetting() : [],
  })

  const getNewSortOrder = (): number => {
    if (!workflowData.actions) return 1

    const sortOrderArray: Array<number> = workflowData.actions
      .filter((act) => act.sta_id === data.sta_id)
      .map((act) => act.sort_order)

    if (sortOrderArray.length === 0) return 1
    return Math.max(...sortOrderArray) + 1
  }

  const stateArray = () =>
    workflowData.states?.map((sta: stateDefinition) => ({
      id: sta.id,
      label: sta.code,
    }))

  const saveData = async (formikData, setSubmitting) => {
    const actionData = {
      ...data,
      action_settings: { ...data.action_settings[0] },
      app_id: appID,
    }
    console.log(JSON.stringify(actionData))

    await DBService.changeData({
      actions: [actionData],
      change_type: DBActionTypes.updateActions,
    })
    setSubmitting(false)
    dispatch({ type: actionTypes.refresh })
    if (data.id) dispatch({ type: actionTypes.hideModal })
  }

  const deleteAction = async () => {
    await DBService.changeData({
      change_type: DBActionTypes.removeAction,
      id: props.id,
    })
    dispatch({ type: actionTypes.refresh })
    dispatch({ type: actionTypes.hideModal })
  }

  const confirmData: IConfirmationData = {
    title: 'Delete Action?',
    description:
      'This action will delete all associated dependencies (action settings)',
    callback: deleteAction,
  }

  const tryDelete = () => {
    dispatch({ type: actionTypes.showConfirmation, data: confirmData })
  }

  // when adding new states, keep increasing new sort order for quick batch insert
  useEffect(() => {
    if (!data.id) {
      setData({
        ...data,
        sort_order: getNewSortOrder(),
      })
    }
  }, [workflowData])

  // update new sort order when selected phase changes
  useEffect(() => {
    if (data.id) return
    console.log('Changing sort order due to state change..')
    console.log(getNewSortOrder())
    setData({
      ...data,
      sort_order: getNewSortOrder(),
    })
  }, [data.sta_id])

  return (
    <Formik
      initialValues={data}
      onSubmit={(formikData, { setSubmitting }) =>
        saveData(formikData, setSubmitting)
      }
    >
      {({ handleSubmit, isSubmitting }) => (
        <form
          onSubmit={handleSubmit}
          className={[classes.root, styles.actionForm].join(' ')}
        >
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel>State</InputLabel>
            <Select
              value={data.sta_id}
              onChange={(e) => setData({ ...data, sta_id: e.target.value })}
              label="State"
              required
            >
              <MenuItem value={null}>
                <em>None</em>
              </MenuItem>
              {stateArray().map((sta) => (
                <MenuItem key={sta.id} value={sta.id}>
                  {sta.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel>Action Type</InputLabel>
            <Select
              value={data.action_type}
              onChange={(e) =>
                setData({ ...data, action_type: e.target.value })
              }
              label="Action Type"
              required
            >
              <MenuItem value={null}>
                <em>None</em>
              </MenuItem>
              {validActionTypes.map((actt, idx) => (
                <MenuItem key={idx} value={actt}>
                  {actt}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            autoFocus
            label="Code"
            variant="outlined"
            value={data.code}
            onChange={(e) =>
              setData({
                ...data,
                code: e.target.value.toUpperCase(),
                label: data.id ? data.label : e.target.value.toLowerCase(),
              })
            }
            required
          />
          <TextField
            label="Label"
            variant="outlined"
            value={data.label}
            onChange={(e) => setData({ ...data, label: e.target.value })}
            required
          />
          {props.id ? (
            props.action_type === EActionTypes.stateChange ? (
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel>Next state code</InputLabel>
                <Select
                  value={data.action_settings[0].string_value}
                  onChange={(e) =>
                    setData({
                      ...data,
                      action_settings: [
                        {
                          ...data.action_settings[0],
                          string_value: e.target.value,
                        },
                      ],
                    })
                  }
                  label="Next state code"
                  required
                >
                  <MenuItem value={null}>
                    <em>None</em>
                  </MenuItem>
                  {stateArray()
                    .filter((sta) => sta.id !== data.sta_id)
                    .map((sta) => (
                      <MenuItem key={sta.id} value={sta.id}>
                        {sta.label}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            ) : (
              <TextField
                label={actionTypeActionSettingLabelMapping[data.action_type]}
                variant="outlined"
                value={data.action_settings[0].string_value}
                onChange={(e) =>
                  setData({
                    ...data,
                    action_settings: [
                      {
                        ...data.action_settings[0],
                        string_value: e.target.value,
                      },
                    ],
                  })
                }
              />
            )
          ) : null}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              margin: '20px',
            }}
          >
            {data?.id ? (
              <Button
                variant="contained"
                color="secondary"
                startIcon={<DeleteIcon />}
                onClick={tryDelete}
                size="small"
              >
                delete
              </Button>
            ) : null}
            <Button
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              type="submit"
            >
              Save
            </Button>
          </div>
        </form>
      )}
    </Formik>
  )
}

export default ActionForm
