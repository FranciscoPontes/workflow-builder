import React from 'react'
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
import { stateDefinition } from '../../State/State'
import { actionTypes } from '../../../store/actionTypes'
import DeleteIcon from '@material-ui/icons/Delete'
import { IConfirmationData } from '../../UIConfirmation/UIConfirmation'
import { useEffect } from 'react'
import { DBActionTypes } from '../../../services/dbActionTypes'
import styles from './StateForm.module.css'
import { formatCode, formatLabel } from '../../../utils/inputFormatter'

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

interface IStateForm {
  props: stateDefinition
}

const StateForm = ({ props }: IStateForm) => {
  const dispatch = useDispatch()
  const workflowData = useSelector((state) => state.workflowData)
  const appID = useSelector((state) => state.appData.appID)
  const classes = useStyles()

  const [data, setData] = useState<stateDefinition>({
    code: props?.code || '',
    label: props?.label || '',
    sort_order: props?.sort_order,
    pha_id: props?.pha_id || null,
    id: props?.id || null,
  })

  const getNewSortOrder = (): number => {
    if (!workflowData.states) return 1

    const sortOrderArray: Array<number> = workflowData.states
      .filter((sta) => sta.pha_id === data.pha_id)
      .map((sta) => sta.sort_order)

    if (sortOrderArray.length === 0) return 1
    return Math.max(...sortOrderArray) + 1
  }

  const phaseArray = () =>
    workflowData.phases?.map((pha) => ({ pha_id: pha.id, code: pha.code }))

  const saveData = async (formikData, setSubmitting) => {
    const stateData = {
      pha_id: data.pha_id,
      app_id: appID,
      code: data.code,
      label: data.label,
      sort_order: data.sort_order,
      id: data.id,
    }
    console.log(
      JSON.stringify({
        states: [stateData],
        change_type: DBActionTypes.updateStates,
      }),
    )
    await DBService.changeData({
      states: [stateData],
      change_type: DBActionTypes.updateStates,
    })
    setSubmitting(false)
    dispatch({ type: actionTypes.refresh })
    if (data.id) dispatch({ type: actionTypes.hideModal })
  }

  const deleteState = async () => {
    await DBService.changeData({
      change_type: DBActionTypes.removeState,
      id: props.id,
    })
    dispatch({ type: actionTypes.refresh })
    dispatch({ type: actionTypes.hideModal })
  }

  const confirmData: IConfirmationData = {
    title: 'Delete State?',
    description:
      'This action will delete all associated dependencies (actions, permissions..)',
    callback: deleteState,
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
    console.log('Changing sort order due to phase change..')
    console.log(getNewSortOrder())
    setData({
      ...data,
      sort_order: getNewSortOrder(),
    })
  }, [data.pha_id])

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
          className={[classes.root, styles.stateForm].join(' ')}
        >
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel>Phase</InputLabel>
            <Select
              value={data.pha_id}
              onChange={(e) => setData({ ...data, pha_id: e.target.value })}
              label="Phase"
              required
            >
              <MenuItem value={null}>
                <em>None</em>
              </MenuItem>
              {phaseArray().map((pha) => (
                <MenuItem key={pha.pha_id} value={pha.pha_id}>
                  {pha.code}
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
                code: formatCode(e.target.value),
                label: data.id ? data.label : formatLabel(e.target.value),
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
          {/* <TextField
            id="phase-label"
            label="Sort order"
            variant="outlined"
            type="number"
            required
            value={data.sort_order}
            onChange={(e) => setData({ ...data, sortOrder: e.target.value })}
          /> */}
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

export default StateForm
