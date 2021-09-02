import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { useState } from 'react'
import Button from '@material-ui/core/Button'
import { Formik } from 'formik'
import { DBService } from '../../services/db_communication'
import { useDispatch, useSelector } from 'react-redux'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import { TPhaseList } from '../newItemsSpeedDial/newItemsSpeedDial'

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

interface IStateData {
  code: string
  label: string
  sortOrder: number
  pha_id: number
}

const StateForm = () => {
  const dispatch = useDispatch()
  const workflowData = useSelector((state) => state.workflowData)
  const classes = useStyles()
  const [data, setData] = useState<IStateData>({
    code: '',
    label: '',
    sortOrder: 0,
    pha_id: 0,
  })

  const phaseArray = () =>
    workflowData?.phases.map((pha) => ({ pha_id: pha.id, code: pha.code }))

  const saveData = async (formikData, setSubmitting) => {
    console.log('Initiated save')
    const stateData = {
      pha_id: data.pha_id,
      app_id: window.appID,
      code: data.code,
      label: data.label,
      sort_order: data.sortOrder,
      change_type: 'ADD_STATE',
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
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">
              Phase
            </InputLabel>
            <Select
              value={data.pha_id}
              onChange={(e) => setData({ ...data, pha_id: e.target.value })}
              label="Phase"
            >
              <MenuItem value={0}>
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

export default StateForm
