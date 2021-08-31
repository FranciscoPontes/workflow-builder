import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { useState } from 'react'
import Button from '@material-ui/core/Button'
import { Formik } from 'formik'
import { DBService } from '../../services/db_communication'
import { useDispatch } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}))

interface IPhaseData {
  code: string
  label: string
  sortOrder: number
}

const PhaseForm = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [data, setData] = useState<IPhaseData>({
    code: '',
    label: '',
    sortOrder: 0,
  })

  const saveData = async (formikData, setSubmitting) => {
    console.log('Initiated save')
    const stateData = {
      app_id: window.appID,
      code: data.code,
      label: data.label,
      sort_order: data.sortOrder,
      change_type: 'ADD_PHASE',
    }
    console.log(stateData)
    await DBService.changeData(stateData)
    console.log('Finished saving')
    setSubmitting(false)
    dispatch({ type: 'REFRESH' })
  }

  return (
    <Formik
      initialValues={data}
      onSubmit={(formikData, { setSubmitting }) =>
        saveData(formikData, setSubmitting)
      }
    >
      {({ handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit} className={classes.root}>
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
          <TextField
            id="phase-label"
            label="Sort order"
            variant="outlined"
            type="number"
            required
            value={data.sortOrder}
            onChange={(e) => setData({ ...data, sortOrder: e.target.value })}
          />
          <Button
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            type="submit"
          >
            Save
          </Button>
        </form>
      )}
    </Formik>
  )
}

export default PhaseForm
