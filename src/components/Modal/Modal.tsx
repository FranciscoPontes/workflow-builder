import React from 'react';
import Modal from '@material-ui/core/Modal';
import styles from './Modal.module.css';

export interface ModalProps {
    props: {
        isOpen: boolean,
        handleClose: () => void,
        title: string,
        description: string, 
        callback: () => void
    }
}

export const SimpleModal = ({isOpen, handleClose, title, description, callback} : ModalProps) => {

  const body = (
    <div className={styles.paper}>
      <h2>{title}</h2>
      <p>
        {description}
      </p>
      <button onClick={callback}>Apply</button>
    </div>
  );

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
