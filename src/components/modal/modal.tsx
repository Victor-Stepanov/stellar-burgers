import React, { EventHandler, FC } from "react";
import ReactDOM from "react-dom";
import ModalStyles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { useEffect } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { IModal } from "./modal.props";

const modalRoot = document.querySelector("#modals") as HTMLElement;

const Modal: FC<IModal> = ({ title, onClose, children }): JSX.Element => {
    //Закрыть модальных окон на Esc
    const handleEscKeydown = (evt: { key: string }) => {
        evt.key === "Escape" && onClose();
    };
    //Закрыли модальное окно на крестик //any??
    const closeModalWithTheButton = (evt: any) => {
        evt.target && onClose();
    };

    useEffect(() => {
        document.addEventListener("keydown", handleEscKeydown);
        return () => {
            document.removeEventListener("keydown", handleEscKeydown);
        };
    });

    return ReactDOM.createPortal(
        <>
            <div className={ModalStyles.container}>
                <h3
                    className={`${ModalStyles.title} text text_type_main-large mt-10  ml-10`}
                >
                    {title}
                </h3>
                <button
                    className={ModalStyles.closeButton}
                    onClick={closeModalWithTheButton}
                >
                    <CloseIcon type="primary" />
                </button>
                <div className={ModalStyles.test}> {children}</div>
            </div>
            <ModalOverlay onClick={onClose} />
        </>,
        modalRoot
    );
};

export default Modal;
