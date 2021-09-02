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
    console.log('Initiated save')
    const stateData = {
      app_id: window.appID,
      code: data.code,
      label: data.label,
      sort_order: data.sortOrder,
      change_type: 'UPDATE_PHASES',
    }
    console.log(stateData)
    await DBService.changeData(stateData)
    console.log('Finished saving')
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
          <Button
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            type="submit"
          >
            Save
          </Button>
          {props?.id ? (
            <Button
              variant="contained"
              color="secondary"
              startIcon={<DeleteIcon />}
              onClick={deletePhase}
            >
              Delete
            </Button>
          ) : null}
        </form>
      )}
    </Formik>
  )
}

export default PhaseForm
