import PropTypes from 'prop-types';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import modalStyles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById('modal-root');

function Modal({ children, header, closeModal, isFancyCloseIcon=false }) {

    const handleEscKey = (e) => {
        if (e.key === 'Escape') 
            closeModal();
        e.stopImmediatePropagation();
    }

    useEffect(() => {
        document.addEventListener('keydown', handleEscKey);
        return () => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, []); 

    return ReactDOM.createPortal(
        <>
            <ModalOverlay closeModal={closeModal} />
            <div className={modalStyles.modal_container + ' pl-10 pt-10 pr-10 pb-15'}>
                <h3 className={modalStyles.modal_header + ' text text_type_main-large'}>
                    {header}
                </h3>
                <span className={ `${modalStyles.close_icon} ${isFancyCloseIcon ? modalStyles.fancy_icon : null}` } >
                    <CloseIcon onClick={closeModal} />
                </span>
                {children}
            </div>
        </>, 
        modalRoot
    );
}

Modal.propTypes = {
    children: PropTypes.element.isRequired,
    header: PropTypes.string,
    closeModal: PropTypes.func.isRequired,
    fancyCloseIcon: PropTypes.bool
};

export default Modal;
