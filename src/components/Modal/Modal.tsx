import React from 'react';
import Modal from '@material-ui/core/Modal';
import styles from './Modal.module.css';

export type IModal = {
  isOpen: boolean,
  handleClose: () => void,
  title: string,
  description: string, 
  callback: () => void
}

interface ModalProps {
  props: IModal
}

export const SimpleModal = (props : ModalProps) => {

  const body = (
    <div className={styles.paper}>
      <h2>{props.title}</h2>
      <p>
        {props.description}
      </p>
      <button onClick={props.callback}>Apply</button>
    </div>
  );

  return (
    <div>
      <Modal
        open={props.isOpen}
        onClose={props.handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
