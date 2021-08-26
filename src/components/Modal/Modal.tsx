import React from 'react';
import Modal from '@material-ui/core/Modal';
import styles from './Modal.module.css';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export type IModal = {
  isOpen: boolean,
  title: string,
  description: string, 
  callback: () => void,
  closeHandler: () => void
}

export const SimpleModal = (props : IModal) => {
  const classes = useStyles();

  const [ code, setCode ] = useState<string>('');

  const body = (
    <div className={styles.paper}>
      <h2>{props.title}</h2>
      <p>
        {props.description}
      </p>
      {/* <form className={classes.root} noValidate autoComplete="off">
        <TextField id="outlined-basic" 
                   label="Code" 
                   variant="outlined"
                   value={code}
                   onChange={(e) => setCode(e.target.value)} />
      </form>
      <button onClick={() => props.callback()}>Apply</button> */}
    </div>
  );

  return (
    <div>
      <Modal
        open={props.isOpen}
        onClose={() => props.closeHandler()}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
