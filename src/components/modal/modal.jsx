import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay.jsx';
import {useEffect} from 'react';

const modalRoot = document.getElementById("modals");

const Modal = ({title, onOverlayClick, onEscKeydown, children}) => {
    useEffect(() => {
        document.addEventListener('keydown', onEscKeydown);
        return () => {
            document.removeEventListener('keydown', onEscKeydown);
        }
    })


    return ReactDOM.createPortal(
        <>
            <div>
                <h3>{title}</h3>
                {children}
            </div>
            <ModalOverlay onClick={onOverlayClick}/>
        </>,
        modalRoot
    );

};

export default Modal;