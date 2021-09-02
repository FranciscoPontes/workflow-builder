import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { useState } from 'react'
import Button from '@material-ui/core/Button'
import { Formik } from 'formik'
import { DBService } from '../../../services/db_communication'
import { useDispatch, useSelector } from 'react-redux'
import { phaseDefinition } from '../../Phase/Phase'
import DeleteIcon from '@material-ui/icons/Delete'
import styles from './PhaseForm.module.css'
import { actionTypes } from '../../../store/actionTypes'
import { IConfirmationData } from '../../UIConfirmation/UIConfirmation'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}))

interface IPhaseForm {
  props: phaseDefinition
}

const PhaseForm = ({ props }: IPhaseForm) => {
  const dispatch = useDispatch()
  const workflowData = useSelector((state) => state.workflowData)
  const modalData = useSelector((state) => state.modalData)
  const classes = useStyles()

  const getNewSortOrder = (): number => {
    const sortOrderArray: Array<number> = workflowData.phases.map(
      (pha) => pha.sort_order,
    )
    return Math.max(...sortOrderArray) + 1
  }

  const [data, setData] = useState<phaseDefinition>({
    code: props?.code || '',
    label: props?.label || '',
    sortOrder: props?.sortOrder || getNewSortOrder(),
    id: props?.id,
  })

  const saveData = async (formikData, setSubmitting) => {
    const phaseData = {
      id: data.id,
      app_id: window.appID,
      code: data.code,
      label: data.label,
      sort_order: data.sortOrder,
    }

    const preparedDBData = {
      phases: [phaseData],
      change_type: 'UPDATE_PHASES',
    }

    await DBService.changeData(preparedDBData)

    setSubmitting(false)
    dispatch({ type: 'REFRESH' })
  }

  const deletePhase = async () => {
    await DBService.changeData({
      change_type: 'REMOVE_PHASE',
      id: data.id,
    })
    dispatch({ type: 'REFRESH' })
    dispatch({ type: 'MODAL_DATA', data: { ...modalData, isOpen: false } })
  }

  const confirmData: IConfirmationData = {
    title: 'Delete Phase?',
    description:
      'This action will delete all associated states and dependencies (actions, permissions..)',
    callback: deletePhase,
  }

  const tryDelete = () => {
    dispatch({ type: actionTypes.showConfirmation, data: confirmData })
  }

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
          className={[classes.root, styles.form].join(' ')}
        >
          <TextField
            id="phase-code"
            label="Code"
            variant="outlined"
            value={data.code}
            onChange={(e) => setData({ ...data, code: e.target.value })}
            required
          />
          <TextField
            id="phase-label"
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
            value={data.sortOrder}
            onChange={(e) =>
              setData({ ...data, sortOrder: parseInt(e.target.value) })
            }
          /> */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              margin: '20px',
            }}
          >
            {props?.id ? (
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
              size="small"
            >
              Save
            </Button>
          </div>
        </form>
      )}
    </Formik>
  )
}

export default PhaseForm