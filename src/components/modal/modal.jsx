import ReactDOM from 'react-dom';
import ModalStyles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay.jsx';
import {useEffect} from 'react';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';


const modalRoot = document.querySelector('#modals');

const Modal = ({title, onClose, children}) => {

    //Закрыть модальных окон на Esc
    const handleEscKeydown = (evt) => {
        evt.key === "Escape" && onClose();
    }
    //Закрыли модальное окно на крестик
    const closeModalWithTheButton = (evt) => {
        evt.target && onClose();
    }

    useEffect(() => {
        document.addEventListener('keydown', handleEscKeydown);
        return () => {
            document.removeEventListener('keydown', handleEscKeydown);
        }
    })


    return ReactDOM.createPortal(
        <>
            <div className={ModalStyles.container}>
                <h3 className={`${ModalStyles.title} text text_type_main-large mt-10  ml-10`}>{title}</h3>
                <button className={ModalStyles.closeButton} onClick={closeModalWithTheButton}><CloseIcon type="primary"/></button>
                <div className={ModalStyles.test}> {children}</div>
            </div>
            <ModalOverlay onClick={onClose}/>
        </>,
        modalRoot
    );

};

Modal.propTypes = {
    title: PropTypes.string,
    onClose:PropTypes.func,
    children: PropTypes.any
}

export default Modal;