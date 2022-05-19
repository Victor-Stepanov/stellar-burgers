import ReactDOM from 'react-dom';
import ModalStyles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay.jsx';
import {useEffect} from 'react';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';


const modalRoot = document.querySelector('#modals');

const Modal = ({title, onOverlayClick, onEscKeydown, children, closeModal}) => {
    useEffect(() => {
        document.addEventListener('keydown', onEscKeydown);
        return () => {
            document.removeEventListener('keydown', onEscKeydown);
        }
    })


    return ReactDOM.createPortal(
        <>
            <div className={ModalStyles.container}>
                <h3 className={`${ModalStyles.title} text text_type_main-large mt-10  ml-10`}>{title}</h3>
                <button className={ModalStyles.closeButton} onClick={closeModal}><CloseIcon type="primary"/></button>
                <div className={ModalStyles.test}> {children}</div>
            </div>
            <ModalOverlay onClick={onOverlayClick}/>
        </>,
        modalRoot
    );

};

Modal.propTypes = {
    title: PropTypes.string,
    onOverlayClick: PropTypes.func,
    onEscKeydown: PropTypes.func,
    closeModal: PropTypes.func,
    children: PropTypes.any
}

export default Modal;