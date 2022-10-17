import React, { FC } from 'react';
import ModalOverlayStyles from './modal-overlay.module.css';
import { IModalOverlay } from './modal-overlay.props';

const ModalOverlay:FC<IModalOverlay> = ({onClick}):JSX.Element => (
    <div className={ModalOverlayStyles.overlay} onClick={onClick}></div>
)


export default ModalOverlay;