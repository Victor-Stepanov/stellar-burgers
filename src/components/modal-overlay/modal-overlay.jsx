import ModalOverlayStyles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = ({onClick}) => (
    <div className={ModalOverlayStyles.overlay} onClick={onClick}></div>
)

ModalOverlay.propTypes = {
    onClick: PropTypes.func
}

export default ModalOverlay;