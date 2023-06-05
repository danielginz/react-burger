import {FC, useEffect} from 'react';
import ReactDOM from 'react-dom';
import modalStyles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById('modal-root');
if (!modalRoot) {
    throw new Error("The element #modal-root wasn't found");
}

interface IModal {
    children: JSX.Element,
    header: string | null,
    closeModal: () => void,
    isFancyCloseIcon?: boolean,
    isOrderModal?: boolean
}
const Modal: FC<IModal> = ({
                               children,
                               header,
                               closeModal,
                               isFancyCloseIcon=false,
                               isOrderModal=false
                           }) => {
    const handleEscKey = (e: KeyboardEvent): void => {
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
                    <CloseIcon onClick={closeModal} type='primary' />
                </span>
                {children}
            </div>
        </>,

        modalRoot
    );
}

export default Modal;
