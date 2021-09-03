import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import SpeedDial from '@material-ui/lab/SpeedDial'
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon'
import SpeedDialAction from '@material-ui/lab/SpeedDialAction'
import { EModalTypes, IModal } from '../Modal/Modal'
import { useDispatch } from 'react-redux'
import { actionTypes } from '../../store/actionTypes'

const useStyles = makeStyles((theme) => ({
  root: {
    transform: 'translateZ(0px)',
    flexGrow: 1,
  },
  exampleWrapper: {
    position: 'relative',
    marginTop: theme.spacing(3),
    height: 380,
  },
  radioGroup: {
    margin: theme.spacing(1, 0),
  },
  speedDial: {
    position: 'absolute',
    '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
      top: theme.spacing(2),
      left: theme.spacing(2),
    },
  },
}))

type TPhaseSelect = {
  pha_id: number
  code: string
}

export type TPhaseList = Array<TPhaseSelect>

const NewItemsSpeedDial = () => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const dispatch = useDispatch()

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const PhaseModalData: IModal = {
    type: EModalTypes.phase,
    title: 'Phase settings',
    description: '',
  }

  const StateModalData: IModal = {
    type: EModalTypes.state,
    title: 'State settings',
    description: '',
  }

  const actions = [
    {
      icon: <span style={{ fontSize: 'smaller' }}>Phase</span>,
      name: 'Phase',
      modalData: PhaseModalData,
    },
    {
      icon: <span style={{ fontSize: 'smaller' }}>State</span>,
      name: 'State',
      modalData: StateModalData,
    },
  ]

  return (
    <div className={classes.root}>
      <div className={classes.exampleWrapper}>
        <SpeedDial
          ariaLabel="SpeedDial example"
          className={classes.speedDial}
          icon={<SpeedDialIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          direction="down"
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() =>
                dispatch({
                  type: actionTypes.showModal,
                  data: action.modalData,
                })
              }
            />
          ))}
        </SpeedDial>
      </div>
    </div>
  )
}

export default NewItemsSpeedDial
