'use client';
import css from './Modal.module.css';
import { ReactNode } from 'react';

type ModalProps = {
  children: ReactNode;
  onClose: () => void;
};

export default function Modal({ children, onClose }: ModalProps) {
  const handleClose = () => {
    onClose();
  };

  return (
    <div className={css.backdrop} onClick={handleClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeButton} onClick={handleClose}>
          Close
        </button>
        {children}
      </div>
    </div>
  );
}
